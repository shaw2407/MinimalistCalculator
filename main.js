const dataInput = document.querySelectorAll('[data-input]')
const dataArithmetic = document.querySelectorAll('[data-arithmetic]')
const dataAllClear = document.querySelector('[data-all-clear]')
const dataClear = document.querySelector('[data-clear]')
const dataDelete = document.querySelector('[data-delete]')
const dataEqual = document.querySelector('[data-equal]')
const dataCurrentResult = document.querySelector('[data-current-result]')
const dataPreviousResult = document.querySelector('[data-previous-result]')

class calculator{
	constructor(dataPreviousResult, dataCurrentResult){
		this.dataPreviousResult = dataPreviousResult
		this.dataCurrentResult = dataCurrentResult
		this.allClear()
	}

	clear(){
		this.currentResult = ''
	}

	allClear(){
		this.previousResult = ''
		this.currentResult = ''
		this.Arithmetic = undefined
	}

	delete(){
		this.currentResult = this.currentResult.toString().slice(0, -1)
	}

	addNumber(number){
		if (number == "." && this.currentResult.includes(".")) return 
		this.currentResult = this.currentResult.toString() + number.toString()
	}

	chooseOperator(Arithmetic){
		if(this.currentResult === '') return
		if(this.currentResult !== ''){
			this.computation()
		}
		this.Arithmetic = Arithmetic
		this.previousResult = this.currentResult
		this.currentResult = ''
	}

	computation(){
		let res
		const prev = parseFloat(this.previousResult)
		const curr = parseFloat(this.currentResult)
		if(isNaN(prev) || isNaN(curr)) return
		switch(this.Arithmetic){
			case '+':
				res = prev + curr
				break;
			case '-':
				res = prev - curr
				break;
			case '*':
				res = prev * curr
				break;
			case '/':
				res = prev / curr
				break;
			case '%':
				res = prev % curr
				break;
			default:
				break;
		}

		this.currentResult = res
		this.Arithmetic = undefined
		this.previousResult = ''
	}

	getDisplay(number){	
		const intDigit = new Intl.NumberFormat('en')
		const displayDigit = parseFloat(number)
		intDigit.format(number)
		number.toString()
		return number
	}

	displayResult(){
		this.dataCurrentResult.innerText = this.getDisplay(this.currentResult)
		if(this.Arithmetic != null){
			this.dataPreviousResult.innerText = 
			`${this.getDisplay(this.previousResult)} ${this.Arithmetic}`
		}else{
			this.dataPreviousResult.innerText = ''
		}
	}


}

const calc = new calculator(dataPreviousResult, dataCurrentResult)

dataInput.forEach(button => {
	button.addEventListener('click', () =>{
		calc.addNumber(button.innerText)
		calc.displayResult()
	})
})


dataArithmetic.forEach(button =>{
	button.addEventListener('click', () =>{
		calc.chooseOperator(button.innerText)
		calc.displayResult()
	})
})

dataDelete.addEventListener('click', () =>{
	calc.delete()
	calc.displayResult()
})

dataClear.addEventListener('click', () =>{
	calc.clear()
	calc.displayResult()
})

dataAllClear.addEventListener('click', () => {
	calc.allClear()
	calc.displayResult()
})

dataEqual.addEventListener('click', () => {
	calc.computation()
	calc.displayResult()
})
