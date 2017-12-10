# rn-index-scroller
React Native component for instant scrolling through indexed items (like iOS contacts app)

![](https://media.giphy.com/media/3o6fJ60CCVSwMtYN1e/giphy.gif)

## Installation

```
npm install --save rn-index-scroller@khoi-nguyen-2359/rn-index-scroller#master
```

## Usage example

```javascript
import { 
  IndexScroller,
  lowerAlphabetIndex,
  upperAlphabetIndex
} from 'rn-index-scroller'

const index = upperAlphabetIndex // or any arrays like ['a', '2', 'E']
...
<IndexScroller 
  onChange={(i)=>{this.setState({currentIndex: index[i]})}} 
  index={index} 
  style={{
          fontSize: 16,
          paddingVertical: 10,
          paddingTop: 120,
          fontWeight: 'bold',
          color: 'blue',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0
        }} />
```

This library was tested with:
```
"react": "16.0.0-alpha.12",
"react-native": "0.47.1",
```
