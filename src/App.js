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
  useToast,
  Button
} from "@chakra-ui/react";
import { FaRedo, FaCheck, FaTimes } from "react-icons/fa";

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
  const [flippedCards, setFlippedCards] = useState([]);
  const [answeredCards, setAnsweredCards] = useState([]);
  const toast = useToast();

  const handleFlip = (id) => {
    setFlippedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id) 
        : [...prev, id]
    );
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
    setFlippedCards([]);
    setAnsweredCards([]);
  };

  return (
    <Box>
      <Flex justify="flex-end" mb={4}>
        <Button 
          leftIcon={<FaRedo />} 
          onClick={resetCards}
          colorScheme="teal"
          variant="outline"
          size="sm"
        >
          Reset All
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {flashcards.map((card) => (
          <FlashCard
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id)}
            isAnswered={answeredCards.includes(card.id)}
            onFlip={() => handleFlip(card.id)}
            onAnswer={handleAnswer}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

const FlashCard = ({ card, isFlipped, isAnswered, onFlip, onAnswer }) => {
  const { id, question, answer, category } = card;
  const questionBgColor = useColorModeValue('blue.50', 'blue.700');
  const answerBgColor = useColorModeValue('green.50', 'green.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      minHeight="300px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      my={4}
      p={4}
    >
      <Box
        borderRadius="lg"
        boxShadow="xl"
        p={6}
        width="100%"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        cursor="pointer"
        onClick={onFlip}
        style={{
          perspective: '1000px',
        }}
        borderWidth="1px"
        borderColor={isAnswered ? "green.300" : borderColor}
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          borderRadius="lg"
          boxShadow="lg"
          p={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="medium"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Question side */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            borderRadius="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg={questionBgColor}
            color={textColor}
            p={6}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Badge 
              position="absolute" 
              top={2} 
              right={2} 
              colorScheme="blue"
            >
              {category}
            </Badge>
            <Heading size="md" mb={4}>Question</Heading>
            <Text fontSize="lg" textAlign="center">{question}</Text>
            <Badge 
              position="absolute" 
              bottom={4} 
              right={4} 
              colorScheme="blue"
            >
              Click to flip
            </Badge>
          </Box>
          
          {/* Answer side */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            borderRadius="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg={answerBgColor}
            color={textColor}
            p={6}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <Heading size="md" mb={4}>Answer</Heading>
            <Text fontSize="lg" textAlign="center">{answer}</Text>
            
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
            
            <Badge 
              position="absolute" 
              bottom={4} 
              right={4} 
              colorScheme="green"
            >
              Click to flip
            </Badge>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
