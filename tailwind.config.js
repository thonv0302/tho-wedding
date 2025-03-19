export default {
    theme: {
      extend: {
        animation: {
          heartbeat: "heartbeat 1.5s infinite ease-in-out",
        },
        keyframes: {
          heartbeat: {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.2)" },
          },
        },
      },
    },
    plugins: [],
  };