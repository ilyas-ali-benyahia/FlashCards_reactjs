import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Flex,
  IconButton,
  useToast,
  Button,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Progress,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  HStack
} from "@chakra-ui/react";
import { FaRedo, FaCheck, FaTimes, FaFilter, FaChevronDown, FaLightbulb, FaStar } from "react-icons/fa";

const flashcards = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
    category: "Fundamentals",
    difficulty: "Easy"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
    category: "Fundamentals",
    difficulty: "Easy"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
    category: "Fundamentals",
    difficulty: "Medium"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
    category: "Advanced",
    difficulty: "Medium"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
    category: "Hooks",
    difficulty: "Hard"
  },
  {
    id: 2002,
    question: "What do we call an input element completely synchronized with state?",
    answer: "Controlled element",
    category: "Forms",
    difficulty: "Hard"
  }
];

export default function App() {
  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        <Heading 
          as="h1" 
          size="xl" 
          mb={2} 
          textAlign="center" 
          bgGradient="linear(to-r, teal.500, blue.500)" 
          bgClip="text"
          fontWeight="extrabold"
        >
          React Flashcards
        </Heading>
        <Text textAlign="center" color="gray.600" mb={8}>Master React concepts with interactive flashcards</Text>
        <FlashCards />
      </Container>
    </Box>
  );
}

function FlashCards() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [answeredCards, setAnsweredCards] = useState([]);
  const [correctCards, setCorrectCards] = useState([]);
  const [incorrectCards, setIncorrectCards] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [showHint, setShowHint] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const toast = useToast();

  // Get unique categories and difficulties
  const categories = ["All", ...new Set(flashcards.map(card => card.category))];
  const difficulties = ["All", ...new Set(flashcards.map(card => card.difficulty))];

  const handleFlip = (id) => {
    setFlippedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id) 
        : [...prev, id]
    );
  };

  const handleAnswer = (id, isCorrect) => {
    if (!answeredCards.includes(id)) {
      setAnsweredCards(prev => [...prev, id]);
      
      if (isCorrect) {
        setCorrectCards(prev => [...prev, id]);
        toast({
          title: "Correct! 🎉",
          description: "Great job!",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } else {
        setIncorrectCards(prev => [...prev, id]);
        toast({
          title: "Keep studying! 💪",
          description: "You'll get it next time!",
          status: "warning",
          duration: 1500,
          isClosable: true,
        });
      }
    }
  };

  const resetCards = () => {
    setFlippedCards([]);
    setAnsweredCards([]);
    setCorrectCards([]);
    setIncorrectCards([]);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id) 
        : [...prev, id]
    );
  };

  // Filter cards based on selected category and difficulty
  const filteredCards = flashcards.filter(card => {
    const categoryMatch = activeCategory === "All" || card.category === activeCategory;
    const difficultyMatch = activeDifficulty === "All" || card.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const progress = answeredCards.length > 0 
    ? (correctCards.length / answeredCards.length) * 100 
    : 0;

  return (
    <Box>
      <Box bg="white" p={6} borderRadius="xl" boxShadow="md" mb={6}>
        <StatGroup mb={4}>
          <Stat>
            <StatLabel>Progress</StatLabel>
            <StatNumber>{answeredCards.length} / {filteredCards.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Correct</StatLabel>
            <StatNumber>{correctCards.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Success Rate</StatLabel>
            <StatNumber>{answeredCards.length > 0 ? `${Math.round(progress)}%` : '0%'}</StatNumber>
          </Stat>
        </StatGroup>
        
        <Progress 
          value={progress} 
          colorScheme="teal" 
          size="sm" 
          borderRadius="full" 
          mb={4}
        />

        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <HStack spacing={2}>
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />} size="sm" colorScheme="blue" variant="outline">
                <Flex align="center">
                  <FaFilter style={{ marginRight: "8px" }} />
                  Category: {activeCategory}
                </Flex>
              </MenuButton>
              <MenuList>
                {categories.map(category => (
                  <MenuItem key={category} onClick={() => setActiveCategory(category)}>
                    {category}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />} size="sm" colorScheme="purple" variant="outline">
                <Flex align="center">
                  <FaFilter style={{ marginRight: "8px" }} />
                  Difficulty: {activeDifficulty}
                </Flex>
              </MenuButton>
              <MenuList>
                {difficulties.map(difficulty => (
                  <MenuItem key={difficulty} onClick={() => setActiveDifficulty(difficulty)}>
                    {difficulty}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            
            <Tooltip label="Toggle hints">
              <Button
                leftIcon={<FaLightbulb />}
                onClick={() => setShowHint(!showHint)}
                colorScheme={showHint ? "yellow" : "gray"}
                variant={showHint ? "solid" : "outline"}
                size="sm"
              >
                Hints
              </Button>
            </Tooltip>
          </HStack>

          <Button 
            leftIcon={<FaRedo />} 
            onClick={resetCards}
            colorScheme="teal"
            size="sm"
          >
            Reset All
          </Button>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredCards.map((card) => (
          <FlashCard
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id)}
            isAnswered={answeredCards.includes(card.id)}
            isCorrect={correctCards.includes(card.id)}
            isIncorrect={incorrectCards.includes(card.id)}
            isFavorite={favorites.includes(card.id)}
            showHint={showHint}
            onFlip={() => handleFlip(card.id)}
            onAnswer={handleAnswer}
            onToggleFavorite={() => toggleFavorite(card.id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

const FlashCard = ({ 
  card, 
  isFlipped, 
  isAnswered, 
  isCorrect,
  isIncorrect,
  isFavorite,
  showHint,
  onFlip, 
  onAnswer,
  onToggleFavorite
}) => {
  const { id, question, answer, category, difficulty } = card;
  const [hintText, setHintText] = useState("");
  
  useEffect(() => {
    // Generate a hint based on the answer
    if (showHint) {
      const words = answer.split(' ');
      if (words.length > 1) {
        setHintText(`First letter: ${answer[0]}, Length: ${answer.length} chars`);
      } else {
        setHintText(`First letter: ${answer[0]}, Last letter: ${answer[answer.length-1]}`);
      }
    }
  }, [answer, showHint]);

  // Card colors
  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Easy": return "green";
      case "Medium": return "blue";
      case "Hard": return "red";
      default: return "gray";
    }
  };

  const questionBgColor = "white";
  const answerBgColor = "white";
  const borderColor = isCorrect ? "green.300" : isIncorrect ? "red.300" : "gray.200";

  return (
    <Box
      position="relative"
      minHeight="300px"
      transform={isFlipped ? "translateY(-5px)" : "none"}
      transition="transform 0.3s ease"
    >
      {/* Favorite button */}
      <IconButton
        icon={<FaStar />}
        position="absolute"
        top={-3}
        right={-3}
        zIndex={2}
        isRound
        size="sm"
        colorScheme={isFavorite ? "yellow" : "gray"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        aria-label="Favorite"
      />

      <Box
        borderRadius="xl"
        boxShadow={isFlipped ? "lg" : "md"}
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
        borderWidth="2px"
        borderColor={borderColor}
        transition="box-shadow 0.3s ease, transform 0.3s ease"
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          borderRadius="xl"
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
            borderRadius="xl"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg={questionBgColor}
            p={6}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Flex position="absolute" top={3} right={3} gap={2}>
              <Badge colorScheme={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
              <Badge colorScheme="blue">
                {category}
              </Badge>
            </Flex>
            
            <Tag size="sm" colorScheme="teal" mb={6}>Question</Tag>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">{question}</Text>
            
            {showHint && (
              <Box mt={4} p={2} bg="yellow.50" borderRadius="md" width="100%">
                <Text fontSize="sm" color="yellow.700" textAlign="center">
                  <FaLightbulb style={{ display: 'inline', marginRight: '5px' }} />
                  {hintText}
                </Text>
              </Box>
            )}
          </Box>
          
          {/* Answer side */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            borderRadius="xl"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg={answerBgColor}
            p={6}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <Tag size="sm" colorScheme="green" mb={6}>Answer</Tag>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">{answer}</Text>
            
            {!isAnswered && (
              <Flex justify="center" mt={8} gap={4}>
                <Button
                  leftIcon={<FaCheck />}
                  colorScheme="green"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnswer(id, true);
                  }}
                >
                  I knew it
                </Button>
                <Button
                  leftIcon={<FaTimes />}
                  colorScheme="red"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnswer(id, false);
                  }}
                >
                  Still learning
                </Button>
              </Flex>
            )}
            
            {isAnswered && (
              <Badge 
                colorScheme={isCorrect ? "green" : "red"}
                p={2}
                borderRadius="md"
                mt={4}
              >
                {isCorrect ? "Answered Correctly" : "Keep Practicing"}
              </Badge>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
