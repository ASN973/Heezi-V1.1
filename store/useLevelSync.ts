import React, { useEffect, useRef } from "react";
import { collection, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/useAuth";
import { db } from "@/utils/firebase";
import useCompletedLevelsStore from "@/store/useCompletedLevels";
import { PracticeTool } from "@/store/useCompletedLevels";

type SyncStatus = "idle" | "loading" | "synced" | "error";

interface UseLevelSyncResult {
  status: SyncStatus;
  error?: string;
}

/**
 * Hook appelé UNE SEULE FOIS au démarrage dans le layout racine.
 * Lit /users/{uid}/lessons depuis Firestore et remplis le store Zustand.
 * 
 * Imagine : tu ouvres la porte de ton entrepôt le matin,
 * tu lis ta liste de jouets, et tu mets à jour ta boîte à la maison.
 */
export function useLevelSync(): UseLevelSyncResult {
  const { user } = useAuth();
  const { hydrate } = useCompletedLevelsStore();
  
  // Utilise useRef pour éviter les appels dupliqués
  // (React 18 et le Strict Mode causent sinon 2 appels)
  const hasSynced = useRef(false);
  const [status, setStatus] = React.useState<SyncStatus>("idle");
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    // Si déjà synced OU pas d'utilisateur connecté : quitte
    if (hasSynced.current || !user ) return;

    const syncFromFirestore = async () => {
      try {
        setStatus("loading");
        
        // Lis la sous-collection /users/{uid}/lessons
        const lessonsRef = collection(db, "users", user, "lessons");
        const snapshot = await getDocs(lessonsRef);

        // Transforme les documents Firestore en structure Zustand
        const levelsCompleted: Record<
          PracticeTool,
          Record<string, boolean>
        > = {
          spreadsheet: {},
          textEditor: {},
        };

        snapshot.forEach((doc) => {
          const { tool, completed } = doc.data();
          const lessonId = doc.id;

          // Extrait le numéro de niveau de "lesson_spreadsheet_1" → 1
          const levelNumber = extractLevelNumber(lessonId);
          if (levelNumber === null) return; // Skip si format invalide

          // Remplit la structure
          if (tool === "spreadsheet" || tool === "textEditor") {
            levelsCompleted[tool][levelNumber.toString()] = completed ?? false;
          }
        });

        // Injecte dans Zustand
        hydrate(levelsCompleted);
        setStatus("synced");
        hasSynced.current = true;
      } catch (err) {
        console.error("Erreur lors de la sync Firestore:", err);
        setError((err as Error).message);
        setStatus("error");
      }
    };

    syncFromFirestore();
  }, [user, hydrate]);

  return { status, error };
}

/**
 * Extrait le numéro de niveau d'une lessonId.
 * "lesson_spreadsheet_1" → 1
 * "lesson_textEditor_3" → 3
 * 
 * Imagine : tu décodes un code secret pour trouver le numéro caché.
 */
function extractLevelNumber(lessonId: string): number | null {
  const match = lessonId.match(/_(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Écrit un niveau complété dans Firestore.
 * Appelé par le composant quiz quand l'élève finit.
 * 
 * Imagine : tu envoies un message à l'entrepôt pour dire "j'ai joué avec ce jouet".
 */
export async function syncToFirestore(
  uid: string,
  lessonId: string,
  tool: PracticeTool
): Promise<void> {
  try {
    // Écrit dans /users/{uid}/lessons/{lessonId}
    const docRef = doc(db, "users", uid, "lessons", lessonId);
    await setDoc(
      docRef,
      {
        tool,
        completed: true,
        completedAt: Timestamp.now(), // ← Important : Timestamp, pas string !
      },
      { merge: true } // ← Important : merge pour ne pas écraser les autres champs
    );
  } catch (err) {
    console.error("Erreur sync vers Firestore:", err);
    throw err;
  }
}

export type { SyncStatus };