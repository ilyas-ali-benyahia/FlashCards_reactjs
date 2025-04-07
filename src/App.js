import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Flex,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { FaRedo, FaCheck, FaTimes } from "react-icons/fa";
import "./index.css";

const flashcards = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
    category: "Fundamentals"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
    category: "Fundamentals"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
    category: "Fundamentals"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
    category: "Advanced"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
    category: "Hooks"
  },
  {
    id: 2002,
    question: "What do we call an input element completely synchronized with state?",
    answer: "Controlled element",
    category: "Forms"
  }
];

export default function App() {
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={8} textAlign="center" color="teal.500">
        React Flashcards
      </Heading>
      <FlashCards />
    </Box>
  );
}

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);
  const [answeredCards, setAnsweredCards] = useState([]);
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("teal.50", "teal.900");

  const handleClick = (id) => {
    setSelectedId(id !== selectedId ? id : null);
  };

  const handleAnswer = (id, isCorrect) => {
    setAnsweredCards([...answeredCards, id]);
    toast({
      title: isCorrect ? "Correct! 🎉" : "Keep trying! 💪",
      status: isCorrect ? "success" : "warning",
      duration: 1500,
      isClosable: true,
    });
  };

  const resetCards = () => {
    setAnsweredCards([]);
    setSelectedId(null);
  };

  return (
    <Box>
      <Flex justify="flex-end" mb={4}>
        <IconButton
          icon={<FaRedo />}
          onClick={resetCards}
          aria-label="Reset cards"
          colorScheme="teal"
          variant="outline"
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {flashcards.map((card) => (
          <FlashCard
            key={card.id}
            card={card}
            isSelected={selectedId === card.id}
            isAnswered={answeredCards.includes(card.id)}
            onClick={handleClick}
            onAnswer={handleAnswer}
            bgColor={cardBg}
            hoverBg={hoverBg}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

const FlashCard = ({ card, isSelected, isAnswered, onClick, onAnswer, bgColor, hoverBg }) => {
  const { id, question, answer, category } = card;
  const questionColor = useColorModeValue("teal.600", "teal.200");
  const answerColor = useColorModeValue("gray.800", "white");
  const categoryColor = useColorModeValue("teal.100", "teal.800");

  return (
    <Box
      borderRadius="lg"
      boxShadow="md"
      p={6}
      minH="200px"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      transition="all 0.2s"
      bg={bgColor}
      _hover={{
        bg: hoverBg,
        transform: "translateY(-2px)",
        boxShadow: "lg"
      }}
      onClick={() => onClick(id)}
      position="relative"
      borderWidth={isAnswered ? "2px" : "1px"}
      borderColor={isAnswered ? "green.300" : "transparent"}
    >
      <Badge
        position="absolute"
        top={2}
        right={2}
        colorScheme="teal"
        bg={categoryColor}
      >
        {category}
      </Badge>

      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Text
          fontSize="xl"
          fontWeight="medium"
          color={isSelected ? answerColor : questionColor}
        >
          {isSelected ? answer : question}
        </Text>
      </Box>

      {isSelected && (
        <Flex justify="center" mt={4} gap={2}>
          <IconButton
            icon={<FaCheck />}
            aria-label="Mark correct"
            colorScheme="green"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAnswer(id, true);
            }}
          />
          <IconButton
            icon={<FaTimes />}
            aria-label="Mark incorrect"
            colorScheme="red"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAnswer(id, false);
            }}
          />
        </Flex>
      )}

      <Badge
        position="absolute"
        bottom={2}
        left={2}
        colorScheme="gray"
        fontSize="xs"
      >
        {isSelected ? "Answer" : "Question"}
      </Badge>
    </Box>
  );
};
