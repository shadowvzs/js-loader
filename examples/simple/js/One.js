class One {
	constructor() {
		this.title = "greetings from First class";
	}
	render () {
		const d = document.createElement('div');
		d.textContent = this.title;
		document.body.appendChild(d);
	}
}