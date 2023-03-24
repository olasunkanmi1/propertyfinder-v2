  
  export const Loader = () => {
    return (
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
        <span />
  
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          height: 10px;
          width: 100%;
          z-index: 10;
        }
        .loader span {
          transform: translateY(2px);
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
  
        .loader span {
          background: rgb(8, 71, 168);
          -webkit-animation: loader 1s  infinite;
            animation: loader 1s  infinite;
        }
  
        .loader span:nth-child(2) {
          -webkit-animation-delay: 0.1s;
                  animation-delay: 0.1s;
        }
  
        .loader span:nth-child(3) {
          -webkit-animation-delay: 0.2s;
                  animation-delay: 0.2s;
        }
  
        .loader span:nth-child(4) {
          -webkit-animation-delay: 0.3s;
                  animation-delay: 0.3s;
        }
  
        .loader span:nth-child(5) {
          -webkit-animation-delay: 0.4s;
                  animation-delay: 0.4s;
        }
  
        @keyframes loader {
          0% {
            background: rgba(8, 71, 168, .65);
          }
          25% {
            background: rgba(8, 71, 168);
          }
          50% {
            background: rgba(8, 71, 168, .65);
          }
          100% {
            background: rgba(8, 71, 168, .65);
          }
        }
        @-webkit-keyframes loader {
          0% {
            background: rgba(8, 71, 168, .65);
          }
          25% {
            background: rgba(8, 71, 168);
          }
          50% {
            background: rgba(8, 71, 168, .65);
          }
          100% {
            background: rgba(8, 71, 168, .65);
          }
        }
        `}</style>
      </div>
    )
}