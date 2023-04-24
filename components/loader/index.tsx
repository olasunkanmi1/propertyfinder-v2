  
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

export const PageLoader = () => {
  return (
    <div className="lds-ripple">
      <div />
      <div />

      <style jsx>{`
        .lds-ripple {
          display: inline-block;
          position: relative;
          width: 100px;
          height: 100px;
        }
        .lds-ripple div {
          position: absolute;
          border: 4px solid #fff;
          opacity: 1;
          border-radius: 50%;
          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
          animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
          0% {
            top: 45px;
            left: 45px;
            width: 0;
            height: 0;
            opacity: 0;
          }
          4.9% {
            top: 45px;
            left: 45px;
            width: 0;
            height: 0;
            opacity: 0;
          }
          5% {
            top: 45px;
            left: 45px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 0px;
            left: 0px;
            width: 90px;
            height: 90px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}