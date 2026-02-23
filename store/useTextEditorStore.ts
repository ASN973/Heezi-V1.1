import { create } from "zustand";

interface ContentBlock {
  type: string;
  blockId?: string;
  id?: string;
  text?: string;
  placeholder?: string;
  style?: {
    [key: string]: any;
  };
  blockStyle?: {
    [key: string]: any;
  };
  children?: ContentBlock[];
}

const findBlockByIdRecursive = (
  blocks: ContentBlock[] | undefined,
  blockId: string | null
): ContentBlock | undefined => {
  if (!blocks || !blockId) {
    return undefined;
  }

  for (const block of blocks) {
    if (block.blockId === blockId) {
      return block;
    }

    const nestedMatch = findBlockByIdRecursive(block.children, blockId);
    if (nestedMatch) {
      return nestedMatch;
    }
  }

  return undefined;
};

const updateBlockById = (
  blocks: ContentBlock[],
  blockId: string,
  updater: (block: ContentBlock) => ContentBlock
): ContentBlock[] =>
  blocks.map((block) => {
    if (block.blockId === blockId) {
      return updater(block);
    }

    if (block.children?.length) {
      return {
        ...block,
        children: updateBlockById(block.children, blockId, updater),
      };
    }

    return block;
  });

interface TextEditorStore {
  contentBlocks: ContentBlock[];
  selectedBlockId: string | null;
  setLevelData: (levelData: any) => void;
  setBlockText: (blockId: string, newValue: any) => void;
  setSelectedBlockId: (blockId: string) => void;
  setBlockStyle: (blockId: string, style: { [key: string]: any }) => void;
  getBlockById: (blockId: string | null) => ContentBlock | undefined;
}

const useTextEditorStore = create<TextEditorStore>((set, get) => ({
  contentBlocks: [],
  selectedBlockId: null,

  setLevelData: (levelData: any) => {
    const contentBlocks = JSON.parse(
      JSON.stringify(levelData?.contentBlocks ?? [])
    );
    set(() => ({
      contentBlocks,
    }));
  },
  setBlockText: (blockId: string, newValue: any) => {
    set((state) => ({
      contentBlocks: updateBlockById(state.contentBlocks, blockId, (block) => ({
        ...block,
        text: newValue,
      })),
    }));
  },
  setSelectedBlockId: (blockId: string) => {
    set(() => ({
      selectedBlockId: blockId,
    }));
  },
  setBlockStyle: (blockId: string, style: { [key: string]: any }) => {
    set((state) => ({
      contentBlocks: updateBlockById(state.contentBlocks, blockId, (block) => ({
        ...block,
        style: { ...block.style, ...style },
      })),
    }));
    get().setSelectedBlockId(null);
  },
  getBlockById: (blockId: string | null) =>
    findBlockByIdRecursive(get().contentBlocks, blockId),
}));
export default useTextEditorStore;
