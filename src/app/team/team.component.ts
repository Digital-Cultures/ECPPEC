import { Component, OnInit } from '@angular/core';


export interface TeamMember{
	name: string;
	position: string;
	about: string;
}
@Component({
	selector: 'app-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss'],
	host: {
		'(window:resize)': 'onResize($event)'
	}
})
export class TeamComponent implements OnInit {

	constructor() { }
	myInnerHeight: number;
	sideBarWidth: number;
	team: any [];
	ngOnInit() {


		this.myInnerHeight = window.innerHeight;
	//	console.log("innerHeight",this.myInnerHeight);

	this.team = [
		{
			name:"Professor Matthew Grenby",
			position:"Principal Investigator",
			about: "Matthew Grenby is Professor of Eighteenth-Century Studies and Dean of Research and Innovation at Newcastle University. Following a first degree and PhD in history at the University of Edinburgh, he taught at several universities before being appointed Fulbright-Robertson Professor of British History at Westminster College in Fulton, Missouri. In 1999, he returned to the UK to work in departments of English, first at De Montfort University, and from 2005 at Newcastle. His research has been on British cultural history in the long eighteenth century, with a focus on political fiction and children’s literature and culture.",
			link:"https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
			image:"matthew.jpg"
		},
		{
			name:"Professor Elaine Chalus",
			position:"Co Investigator",
			about: "Originally trained as a teacher in Canada, I taught for ten years in northern Alberta before returning to university and pursuing postgraduate studies in History as a mature student. I completed my MA at the University of Alberta moved to Oxford (courtesy of receiving a Social Sciences and Humanities Research Council Doctoral Fellowship Award), where I was fortunate to complete my DPhil under the late Professor Paul Langford. I joined the Department of History at the University of Liverpool in May 2016 from Bath Spa University.",
			link:"https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
			image:"elaine.jpg"
		},
		{
			name:"Dr Kendra Packham",
			position:"Research Associate",
			about: "Kendra is a Research Associate at Newcastle University. She specializes in the ​relations between literary representations—including plays, ballads, and novels—and electoral culture. She was awarded her doctorate by the University of Oxford, and has taught and held Fellowships at the universities of Oxford and Cambridge; she has also held Visiting Fellowships at the Lewis Walpole Library, Yale University, and the Folger Shakespeare Library, Washington, D.C. For the ECPPEC project, she’s particularly focusing on recovering and analysing electoral culture, and the links between different electoral interventions and electoral behaviour and political participation.",
			link:"https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
			image:"kendra.jpg"
		},
		{
			name:"Dr James Harris",
			position:"Research Associate",
			about: "James joined Newcastle University as a Research Associate in February 2020, having completed his doctorate at the University of Oxford. He leads on the collection and analysis of polling data for the ECPPEC project, whilst conducting broader research into election practices and political participation. His wider research interests include regional history (particularly Cornwall and Wales), antiquarianism, and the development of Anglicanism.",
			link:"https://www.ncl.ac.uk/elll/staff/profile/jamesharris.html#background",
			image:"james.jpg"
		},
		{
			name:"Dr Tom Schofield",
			position:"Co Investigator",
			about: "My work with archives and cultural data engages practically with issues of digital culture through creative art and design practice. As heritage is increasingly experienced through digital means, issues of objecthood become sites for potential scholarly and creative intervention. I use art and design methods to help us think about the value of cultural heritage, bring it to new publics and rethink scholarly approaches to it.",
			link:"https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
			image:"tom.jpg"
		},
		{
			name:"Dr John Shoneboom",
			position:"Research Software Developer",
			about: "John is a Research Software Developer with a longstanding focus on making complex data sets useful to a stakeholder community that ranges from lay people to experts. He is also a novelist and playwright with a PhD in Creative Writing, an MA in Science, Technology, and International Affairs, and a BA in Political Science. When he’s not writing code and taming databases, his practice-led research interest is in developing a surrealist mode of inquiry for interrogating (inter alia) the national security state.",
			link:"https://www.ncl.ac.uk/sacs/staff/",
			image:"john.jpg"
		},
		{
			name:"Dan Foster Smith",
			position:"Research Software Developer",
			about: "Dan joined the ECPPEC project as a Research Software Developer in January 2021. He has a background in Graphic Design, Software Development and Data visualisation. He has previously worked as a Research Associate Newcastle University on a number of Cultural Heritage Projects and is also currently studding a PhD in AI and Design. For the ECPPEC project, he’s jointly focusing on the development of the API and online visualisation of the polling data and the surrounding electoral cultural.",
			link:"https://www.ncl.ac.uk/sacs/staff/profile/danielfoster-smith.html",
			image:"dan.jpg"
		}
	];
}
onResize(event) {
  // event.target.innerWidth;
  this.myInnerHeight = event.target.innerHeight;
}
getUrl(member)
{
	//console.log("url('./assets/images/team/"+member.image+"')");
	return "url('./assets/images/team/"+member.image+"')";
}
}
