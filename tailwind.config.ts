export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      /* Fonts */
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'],
      },

      /* Images & gradients  */
      backgroundImage: {
        'sky-photo'     : 'url("/images/forest_bg.png")',
        'left-wall-top' : 'url("/images/tree4.png")',
        'spider-sprite' : 'url("/images/spider.png")',
        'hero-idle-r'   : 'url("/images/sprite-back.png")',
        'hero-idle-l'   : 'url("/images/sprite-front.png")',
        'hero-run-r'    : 'url("/images/running-back.png")',
        'hero-run-l'    : 'url("/images/running-front.png")',
        'hammer-tex'    : 'url("/images/hammer.png")',
      },
      /* add more as required */

      /* Keyframes */
      keyframes: {
        spider: {
          'from' : { backgroundPosition: '0 0'      },
          'to'   : { backgroundPosition: '-840px 0' },
        },
        spiderWalk: {
          '0%'   : { transform: 'translateX(2000px) translateY(100%) rotate(5deg)'   },
          '5%'   : { transform: 'translateX(1800px) translateY(0)    rotate(0deg)'   },
          '10%'  : { transform: 'translateX(1600px) translateY(0)    rotate(0deg)'   },
          '40%'  : { transform: 'translateX(400px)  translateY(0)    rotate(0deg)'   },
          '45%'  : { transform: 'translateX(200px)  translateY(0)    rotate(0deg)'   },
          '50%'  : { transform: 'translateX(0px)    translateY(100%) rotate(5deg)'   },
          '100%' : { transform: 'translateX(0px)    translateY(100%) rotate(-5deg)'  },
        },
        runRight: {
          'from' : { backgroundPosition: '0 0'     },
          'to'   : { backgroundPosition: '-192px 0' },
        },
        runLeft: {
          'from' : { backgroundPosition: '0 0'     },
          'to'   : { backgroundPosition: '-192px 0' },
        },
        jump: {
          '0%'   : { top: '70%' },
          '50%'  : { top: '50%' },
          '100%' : { top: '70%' },
        },
        MoveUpDown: {
          '0%,100%': { bottom: 'calc(50% + 300px)'  },
          '50%'    : { bottom: 'calc(50% - 210px)'  },
        },
        fly: {
          'from' : { backgroundPosition: '0 0'    },
          'to'   : { backgroundPosition: '0 -400px'},
        },
        flyHorizontal: {
          'from' : { marginLeft: '10000px' },
          'to'   : { marginLeft: '-10000px'},
        },
        flyVertical: {
          '0%,100%': { top: 'calc(50% - 120px)' },
          '50%'    : { top: 'calc(50% + 120px)' },
        },
        saw: {
          '0%,100%': { top: 'calc(50% + 300px)', transform: 'rotate(0deg)'   },
          '50%'    : { top: 'calc(50% + 100px)', transform: 'rotate(360deg)' },
        },
        lights: {
          '0%'  : { filter: 'brightness(110%)' },
          '25%' : { filter: 'brightness(90%)'  },
          '30%' : { filter: 'brightness(100%)' },
          '80%' : { filter: 'brightness(95%)'  },
          '100%': { filter: 'brightness(110%)' },
        },
        smoke: {
          '0%'  : { transform: 'translate(-50%,0) scale(0.5)',  opacity: '0.2' },
          '25%' : { transform: 'translate(-60%,-30px) scale(0.7)', opacity: '0.4' },
          '50%' : { transform: 'translate(-70%,-60px) scale(1)',   opacity: '0.4' },
          '75%' : { transform: 'translate(-80%,-90px) scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'translate(-90%,-120px) scale(1.5)', opacity: '0'  },
        },
        scroll: {
          '0%'   : { transform: 'translateY(0)' },
          '50%'  : { transform: 'translateY(8px)' },
          '100%' : { transform: 'translateY(0)' },
        },
      },

      /* Animation utility names  */
      animation: {
        spider        : 'spider 0.3s steps(8) infinite',
        spiderWalk    : 'spiderWalk 17s linear infinite',
        runRight      : 'runRight 0.7s steps(6) infinite',
        runLeft       : 'runLeft 0.7s steps(6) infinite',
        jump          : 'jump 0.5s ease-in-out',
        upDown        : 'MoveUpDown 2s cubic-bezier(0.95,0.05,0.795,0.035) infinite',
        fly           : 'fly 0.5s steps(8) infinite',
        flyHorizontal : 'flyHorizontal 30s linear infinite',
        flyVertical   : 'flyVertical 3s ease-in-out infinite',
        saw           : 'saw 5s ease-in-out infinite',
        lights        : 'lights 3s infinite',
        smoke         : 'smoke 3s infinite',
        scroll        : 'scroll 1s infinite',
      }
    }
  },
  plugins: [],
}