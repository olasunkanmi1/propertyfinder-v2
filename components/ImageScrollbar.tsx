import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex disabled={isFirstItemVisible} justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Flex disabled={isLastItemVisible} justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

export default function ImageScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {data.map((image) => (
        <Box width="910px" height='500px' key={image.id} itemID={image.id} overflow="hidden" p="1">
          <Image
            placeholder="blur"
            blurDataURL={image.url}
            src={image.url}
            alt='property'
            // layout='fill'
            height={500}
            width={500}
            sizes='(max-width: 500px) 100px, (max-width: 1023) 400px, 1000px'
            priority
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
