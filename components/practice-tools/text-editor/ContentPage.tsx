import useCursor from "@/context/useCursor";
import useHighlight from "@/hooks/useHighlight";
import useTextEditorStore from "@/store/useTextEditorStore";
import { isMobile } from "@/utils/isMobile";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInputBlock from "./TextInputBlock";

function TextBlock({ item }: { item: any }) {
  return (
    <View style={[styles.textBlockContainer, item.blockStyle]}>
      <Text style={[styles.text, styles.textBlockText, item.style]}>
        {item.text}
      </Text>
    </View>
  );
}

function ContentItem({ item, index }: { item: any; index: number }) {
  switch (item.type) {
    case "text":
      return <TextBlock key={index} item={item} />;
    case "textInput":
      return <TextInputBlock key={index} item={item} />;
    case "view":
      return (
        <View key={index} style={item.style}>
          {item.children.map((child: any, index: number) => (
            <ContentItem key={index} item={child} index={index} />
          ))}
        </View>
      );
  }
}

export default function ContentPage() {
  const { contentBlocks } = useTextEditorStore();
  const contentPageRef = useRef<View>(null);
  const { setContentRef } = useCursor();
  const pageContentRef = useRef<View>(null);
  useEffect(() => {
    if (setContentRef) {
      setContentRef("contentPage", contentPageRef);
      setContentRef("pageContent", pageContentRef);
    }
  }, [setContentRef]);

  const { hightlightedStyle: contentPageHighlightedStyle } =
    useHighlight("contentPage");
  const { hightlightedStyle: pageContentHighlightedStyle } =
    useHighlight("pageContent");

  return (
    <View
      ref={contentPageRef}
      style={[styles.mainContainer, contentPageHighlightedStyle]}
    >
      <View
        style={[styles.pageContent, pageContentHighlightedStyle]}
        ref={pageContentRef}
      >
        {contentBlocks.map((item, index) => (
          <ContentItem key={index} item={item} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 48,
    marginBottom: 8,
    marginTop: 4,
    marginHorizontal: isMobile ? 16 : "20%",
    paddingHorizontal: isMobile ? 16 : 64,
    borderWidth: 1,
    borderColor: "darkgray",
  },
  pageContent: {
    flex: 1,
  },
  textBlockContainer: {
    alignSelf: "flex-start",
    marginBottom: 11,
    // marginHorizontal: 64,
  },
  textBlockText: {
    color: "#292929",
    textAlignVertical: "center",
  },
  text: { fontSize: 18, lineHeight: 24 },
});
