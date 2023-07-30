import "./App.css";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box
      bg="#001e39"
      h="100vh"
      w="100%"
      pos="relative"
      _before={{
        content: '""',
        display: "block",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundImage: `
        linear-gradient(to right, #404040 1px, transparent 1px)
        `,
        backgroundPosition: "0 0, 0 0",
        backgroundSize: "40px 40px",
        zIndex: 1,
      }}
      _after={{
        content: '""',
        display: "block",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundImage: `
          linear-gradient(#404040 1px, transparent 1px),
          linear-gradient(90deg, #CBD5E0 1px, transparent 1px)
        `,
        backgroundPosition: "0 0, 0 0",
        backgroundSize: "40px 40px",
        zIndex: 1,
      }}
    />
  );
}

export default App;
