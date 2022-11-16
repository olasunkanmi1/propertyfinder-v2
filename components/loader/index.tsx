  
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
            background: rgba(8, 71, 168, .25);
          }
          25% {
            background: rgba(8, 71, 168);
          }
          50% {
            background: rgba(8, 71, 168, .25);
          }
          100% {
            background: rgba(8, 71, 168, .25);
          }
        }
        @-webkit-keyframes loader {
          0% {
            background: rgba(8, 71, 168, .25);
          }
          25% {
            background: rgba(8, 71, 168);
          }
          50% {
            background: rgba(8, 71, 168, .25);
          }
          100% {
            background: rgba(8, 71, 168, .25);
          }
        }
        `}</style>
      </div>
    )
  }
  
  export const Spinner = () => {
    return (
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
  
        <style jsx>{`
          .lds-spinner {
            color: official;
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
            z-index: 10;
          }
          .lds-spinner div {
            transform-origin: 40px 40px;
            animation: lds-spinner 1.2s linear infinite;
          }
          .lds-spinner div:after {
            content: " ";
            display: block;
            position: absolute;
            top: 3px;
            left: 37px;
            width: 6px;
            height: 18px;
            border-radius: 20%;
            background: #808080;
          }
          .lds-spinner div:nth-child(1) {
            transform: rotate(0deg);
            animation-delay: -1.1s;
          }
          .lds-spinner div:nth-child(2) {
            transform: rotate(30deg);
            animation-delay: -1s;
          }
          .lds-spinner div:nth-child(3) {
            transform: rotate(60deg);
            animation-delay: -0.9s;
          }
          .lds-spinner div:nth-child(4) {
            transform: rotate(90deg);
            animation-delay: -0.8s;
          }
          .lds-spinner div:nth-child(5) {
            transform: rotate(120deg);
            animation-delay: -0.7s;
          }
          .lds-spinner div:nth-child(6) {
            transform: rotate(150deg);
            animation-delay: -0.6s;
          }
          .lds-spinner div:nth-child(7) {
            transform: rotate(180deg);
            animation-delay: -0.5s;
          }
          .lds-spinner div:nth-child(8) {
            transform: rotate(210deg);
            animation-delay: -0.4s;
          }
          .lds-spinner div:nth-child(9) {
            transform: rotate(240deg);
            animation-delay: -0.3s;
          }
          .lds-spinner div:nth-child(10) {
            transform: rotate(270deg);
            animation-delay: -0.2s;
          }
          .lds-spinner div:nth-child(11) {
            transform: rotate(300deg);
            animation-delay: -0.1s;
          }
          .lds-spinner div:nth-child(12) {
            transform: rotate(330deg);
            animation-delay: 0s;
          }
          @keyframes lds-spinner {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }