import React from 'react'
import {
  View,
  StyleSheet,
	Platform,
  Text
} from 'react-native'

const lowerAlphabetIndex = Array(26).fill(0).map((val, i) => String.fromCharCode(97 + i))
lowerAlphabetIndex.push('#')
const upperAlphabetIndex = Array(26).fill(0).map((val, i) => String.fromCharCode(65 + i))
upperAlphabetIndex.push('#')

class IndexScroller extends React.Component {
	_lastPageY = 0
  _lastLocationY = 0
	_contentHeight = 0
	_index = []
	_paddingTop = 0
	_paddingBottom = 0
	_lastIndex = -1
	
	constructor(props) {
		super(props)
		this._initIndex(props.index)
	}

	_initIndex = index => {
		if (typeof index === 'string') {
			switch (index) {
				case 'alphabet': {
					this._index = lowerAlphabetIndex
					break
				}
				
				case 'ALPHABET': {
					this._index = upperAlphabetIndex
					break
				}	
			}
		} else if (Array.isArray(index)) {
			this._index = index
		}

		if (!this._index || this._index.length == 0) this._index = upperAlphabetIndex
	}
	
	_getIndexForLocation = (y) => {
		let index = Math.floor((y - this._paddingTop) * this._index.length / this._contentHeight)
		if (index < 0) index = 0
		if (index >= this._index.length) index = this._index.length
		
		return index
	}

	_handleIndexUpdate = (index) => {
		if (index < 0 || index > this._index.length - 1) return

		const { onChange } = this.props
		this._lastIndex = index
		onChange && onChange(index)
	}

	_fixLocationY = (nativeEvent) => {
		if (Platform.OS !== 'android') return nativeEvent.locationY
		
		let locationY = this._lastLocationY || nativeEvent.locationY
		if (this._lastPageY) {
			var dy = nativeEvent.pageY - this._lastPageY
			locationY += dy
		}

		this._lastPageY = nativeEvent.pageY
		this._lastLocationY = locationY

		return locationY
	}
	
	_initContentHeight = event => {
		const { style } = this.props
		const { paddingTop, paddingBottom, paddingVertical, padding } = style
		let realPaddingTop = paddingTop || paddingVertical || padding || 0
		let realPaddingBottom = paddingBottom || paddingVertical || padding || 0
		let contentHeight = event.nativeEvent.layout.height - realPaddingTop - realPaddingBottom
    if (this._contentHeight > 0 && this._contentHeight == contentHeight) return
		this._contentHeight = contentHeight
		this._paddingTop = realPaddingTop
		this._paddingBottom = realPaddingBottom
		this.forceUpdate()
	}
  
	_onLayoutContainer = (event) => {
		this._initContentHeight(event)
  }

	render() {
		const { style } = this.props
		let lineHeight = this._contentHeight / this._index.length
		
		let indicesDisplayText = this._index.reduce((sum, value, index) => {
			let curr = sum
			if (index > 0) {
				curr += '\n'
			}
			return curr + this._index[index]
		}, '')
		return (
			<Text
				onLayout={this._onLayoutContainer} 	
				onTouchStart={event => {
					let locationY = this._fixLocationY(event.nativeEvent)
					let index = this._getIndexForLocation(locationY)
					this._handleIndexUpdate(index)
				}}
				onTouchMove={event => {
					let locationY = this._fixLocationY(event.nativeEvent)
					let index = this._getIndexForLocation(locationY)
					this._handleIndexUpdate(index)
				} }
				onTouchEnd={event => {
					this._lastPageY = 0
					this._lastLocationY = 0
				}}
				style={[styles.container, style, {
					lineHeight,
				}]}>{indicesDisplayText}</Text>
		)
	}
}

export { 
	IndexScroller,
	lowerAlphabetIndex,
	upperAlphabetIndex
}

const styles = StyleSheet.create({
	container: {
		color: 'black',
		backgroundColor: 'white',
		textAlign: 'center',
		paddingHorizontal: 5,
	}
})