class msg {
	text = '';
	statuse = 'info';
	isShown = false;

}
export class message {
	all= [];

	addMessage(msg){
		this.all.push(msg);
	}
}