  
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

export const Spinner = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />

      <style jsx>{`
        .lds-ring {
          display: inline-block;
          position: relative;
          width: 20px;
          height: 20px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 16px;
          height: 16px;
          margin: 2px;
          border: 2px solid #fff;
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #fff transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        `}</style>
    </div>
  )
}