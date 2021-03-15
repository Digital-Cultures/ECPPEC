(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+5AN":
/*!************************************************!*\
  !*** ./src/app/download-poll-books.service.ts ***!
  \************************************************/
/*! exports provided: DownloadPollBooksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadPollBooksService", function() { return DownloadPollBooksService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var DownloadPollBooksService = /** @class */ (function () {
    function DownloadPollBooksService() {
    }
    DownloadPollBooksService.prototype.downloadFile = function (data, filename) {
        if (filename === void 0) { filename = 'data'; }
        var csvData = this.ConvertToCSV(data, ['BookCode', 'PrintMS', 'Citation', 'Holdings', 'Source', 'ElectionCode', 'Notes']);
        // console.log(csvData)
        var blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        var dwldLink = document.createElement("a");
        var url = URL.createObjectURL(blob);
        var isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) { //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    };
    DownloadPollBooksService.prototype.ConvertToCSV = function (objArray, headerList) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = 'S.No,';
        for (var index in headerList) {
            row += headerList[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = (i + 1) + '';
            for (var index in headerList) {
                var head = headerList[index];
                line += ',' + array[i][head];
            }
            str += line + '\r\n';
        }
        return str;
    };
    DownloadPollBooksService.ɵfac = function DownloadPollBooksService_Factory(t) { return new (t || DownloadPollBooksService)(); };
    DownloadPollBooksService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DownloadPollBooksService, factory: DownloadPollBooksService.ɵfac, providedIn: 'root' });
    return DownloadPollBooksService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ntws2/Dropbox/htdocs/ECCPEC_code/SITE_VERSIONS/ECPPEC/src/main.ts */"zUnb");


/***/ }),

/***/ "1VHI":
/*!************************************!*\
  !*** ./src/app/hello.component.ts ***!
  \************************************/
/*! exports provided: HelloComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelloComponent", function() { return HelloComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var HelloComponent = /** @class */ (function () {
    function HelloComponent() {
    }
    HelloComponent.ɵfac = function HelloComponent_Factory(t) { return new (t || HelloComponent)(); };
    HelloComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HelloComponent, selectors: [["hello"]], inputs: { name: "name" }, decls: 2, vars: 1, template: function HelloComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Hello ", ctx.name, "!");
        } }, styles: ["h1[_ngcontent-%COMP%] { font-family: Lato; }"] });
    return HelloComponent;
}());



/***/ }),

/***/ "84zG":
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.myInnerHeight = window.innerHeight;
        console.log("innerHeight", this.myInnerHeight);
    };
    AboutComponent.prototype.onResize = function (event) {
        // event.target.innerWidth;
        this.myInnerHeight = event.target.innerHeight;
        console.log(this.myInnerHeight);
    };
    AboutComponent.ɵfac = function AboutComponent_Factory(t) { return new (t || AboutComponent)(); };
    AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutComponent, selectors: [["app-about"]], hostBindings: function AboutComponent_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function AboutComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
        } }, decls: 21, vars: 2, consts: [["id", "container"], ["id", "style-3", 1, "scrollbar"], ["id", "about_section"]], template: function AboutComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "About ECPPEC");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\nEighteenth-century elections are largely synonymous with corruption and debauchery, epitomised by the infamous 'rotten' and 'pocket' boroughs, and memorably represented by William Hogarth's 'Humours of an Election' series (1755). Certainly only a small proportion of the population could vote. Even fewer could exercise their vote freely. Although general elections were supposed to be held every three, then seven, years, the huge expense of campaigning ensured only a small proportion of constituencies were contested. This was no modern democracy.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\nYet parliamentary elections were fundamentally important to all, not only for the selection of MPs, but also in bestowing a sense of power and belonging (even if only temporarily), in helping to form the nation's self-image, and in helping to forge a new constitutionalist tradition. Moreover, we want to show, elections not only affected, but also engaged, a wide section of the population - both those enfranchised and those not. Elections were often accompanied by an explosion of print, sermons, and song; countless ceremonies, assemblies, and entertainments; new modes of dress, decoration, and behaviour. Men and women, adults and children, rich and poor, franchised and unenfranchised, all participated - as consumers, but also as active makers of this unique cultural and political experience.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\nOur project's fundamental aims are to shine an intense light on these extraordinary moments of participation, ritual, and sometimes carnival, and to consider their consequences and legacies. To do this we will collect new polling data from constituencies across England 1696-1831, working in partnership with local historian groups; subject this data to new kinds of scrutiny using innovative digital tools; and gather the cultural artefacts and practices which constituted people's lived experiences of elections. We will gain new insight into electoral demography, voter behaviour, and how voting patterns changed over time, across regions, and in different types of constituency. And from a combination of archival and creative practice research (the latter designed to reimagine and re-enact important elements of elections now lost) we will gain new understanding of the extent, pervasiveness, and inclusiveness of electoral culture. By placing polling data in its cultural contexts, we will come to understand whether the elements of campaigning - print and processions, banquets and ballads, sashes and sermons - made a difference to political outcomes, or left any significant legacy beyond election time.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "\nSo this project is about two things: how people participate in politics, both with and without the vote; and how interventions across a proliferating range of media affect polling behaviour and outcomes. Both remain highly relevant in our own time. Today, many choose not to vote. This is very different from being excluded from the franchise, as was the great majority in the 18th century. But our research will challenge us to think differently about how non-voters may engage with democratic processes - through music, literature, fashion and art, for example, or via broadcast journalism and social media when once it was handbills and the hustings. We will want to ask whether contemporary phenomena such as data analytics and targeted digital communication strategies have counterparts, even origins, in pre-Reform Britain, and what effects, if any, these kinds of interventions have on people's relationship to the demos. Working with our partners, History of Parliament and the IHR, we aim to communicate our findings to audiences well beyond academia, particularly to schools and at a series of events timed (if possible) to accompany the next UK General Election. As well as reshaping our understanding of how elections functioned before parliamentary reform, we intend that this project should usefully inform pressing debates about political communication and political participation today.\n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Planned Impact");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "\nA central aim of this project is to increase public knowledge of electoral processes in 18th-century England. In particular, we intend that the project will inform a range of audiences about (a) different ways in which people have been able to engage in elections whether or not they had the vote; and (b) the ways in which elections were (we will argue) composed of numerous small interventions taking many different forms, aimed at engaging public opinion and securing or altering the poll's result. Disseminating the new knowledge the project generates about pre-1832 voter behaviour and electoral culture may not change the way people regard democracy today, still less how (or if) they vote. But our intention is that, working with influential non-HEI organisations (History of Parliament, Institute of Historical Research, and Hansard Trust), our historical research should inform debate about issues that remain current: (a) Does political participation inhere purely in the act of voting or might other forms of engagement be just as significant? And (b) what is the history, and what effects should we anticipate, of sophisticated multi-channel campaigns to draw people into elections, from the handbills and hustings of the 18th century to the broadcast and social media of today?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "\nCollaboration with non-academic partners forms a key element of our methodology. Our aim is not simply to 'employ' volunteer citizen historians to help collect and process data; rather local history groups have been (during the pilot phase), and will continue to be, instrumental in setting the project's agenda and providing guidance on the most useful forms for its outputs. The chief vehicle for this co-production will be the Constituency Panels we will establish for each of our case studies, each including volunteers collaborating with the project and, where possible, representatives from local archives. The support of our partners the Institute for Historical Research will be invaluable here, since they have huge experience in recruiting and working with community historians, for instance through networks associated with the Victoria County History, as well as a substantial reach through their social media channels.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "\nWe see local historians also as key (non-HEI) beneficiaries of the research. By the end of the project, many local historians will have received specialised training, and will be empowered to continue and expand the project after its funding comes to an end. Other channels through which we will transmit our research, and debate its implications, to non-academic audiences are set out in our full Pathways to Impact document. They include a substantial and imaginative programme of public engagement events, based in each of our twelve case study constituencies, and provisionally timed to coincide with the next UK General Election (although we appreciate that the present political situation may lead to an election much sooner); a major public lecture; high-profile public launch event, potentially at the Speaker's House (facilitated by History of Parliament); and posts on the Hansard Society's respected and widely-read 'Despatch Box' blog. The element of our project with the widest potential impact is our work aimed at schools. Drawing on successful models already developed and deployed by the project team, we will develop a Learning Framework for use with Key Stage 3 pupils that fits with the requirements of the National Curriculum, supporting teachers in their delivery of mandated/recommended elements of the Citizenship and History programmes. This has the potential to reach very many young people. It will also bring significant benefits to History of Parliament, through whose website the packages will be made available. Their remit is to engage new audiences, ideally including children, with the history of democratic process, and, to an extent, the continuation of their public funding is dependent on fulfilling this objective.\n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("height", ctx.myInnerHeight, "px");
        } }, styles: ["#container[_ngcontent-%COMP%] {\n  padding: 5%;\n  background-color: black;\n  position: relative;\n  width: 90%;\n}\n\n.scroll_style[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border-radius: 10px !important;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;\n  background-color: #D62929 !important;\n}\n\n#about_section[_ngcontent-%COMP%] {\n  \n  height: 100%;\n  margin: auto;\n  text-align: center;\n  width: 80%;\n  \n  text-align: justify;\n}\n\n#spacer[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40%;\n}\n\np[_ngcontent-%COMP%] {\n  color: lightGrey;\n}\n\nh1[_ngcontent-%COMP%] {\n  color: #ffd740;\n  font-family: Roboto;\n  vertical-align: top;\n  line-height: 90%;\n  position: relative;\n}\n\nh2[_ngcontent-%COMP%] {\n  font-family: Roboto;\n  color: white;\n}\n\n.scrollbar[_ngcontent-%COMP%] {\n  \n  \n  \n  height: 80%;\n  overflow-y: scroll;\n  margin-bottom: 25px;\n}\n\n.force-overflow[_ngcontent-%COMP%] {\n  min-height: 450px;\n}\n\n#wrapper[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 500px;\n  margin: auto;\n}\n\n\n\n#style-1[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(255, 0, 0, 0.3);\n  border-radius: 10px;\n  background-color: #F5F5F5;\n}\n\n#style-1[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n\n#style-1[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(255, 0, 0, 0.3);\n  background-color: #555;\n}\n\n\n\n#style-2[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n  background-color: #F5F5F5;\n}\n\n#style-2[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n\n#style-2[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #D62929;\n}\n\n\n\n#style-3[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.63);\n  background-color: orange;\n}\n\n#style-3[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  background-color: orange;\n}\n\n#style-3[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: orange;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Fib3V0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsV0FBQTtFQUNBLHVCQUFBO0VBRUEsa0JBQUE7RUFDQSxVQUFBO0FBQUQ7O0FBRUE7RUFFSSw4QkFBQTtFQUNBLCtEQUFBO0VBQ0Esb0NBQUE7QUFBSjs7QUFFQTtFQUNDOztlQUFBO0VBR0EsWUFBQTtFQUNBLFlBQUE7RUFDQyxrQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDQyxXQUFBO0VBQ0EsV0FBQTtBQUNEOztBQUNBO0VBQ0MsZ0JBQUE7QUFFRDs7QUFBQTtFQUNDLGNBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUdEOztBQUFBO0VBQ0MsbUJBQUE7RUFDQSxZQUFBO0FBR0Q7O0FBRUE7RUFFQTttQkFBQTtFQUVBO29CQUFBO0VBR0ksdUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQURKOztBQUlBO0VBRUksaUJBQUE7QUFGSjs7QUFLQTtFQUVJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFISjs7QUFNQTs7RUFBQTs7QUFJQTtFQUVJLHNEQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQUxKOztBQVFBO0VBRUksV0FBQTtFQUNBLHlCQUFBO0FBTko7O0FBU0E7RUFFSSxtQkFBQTtFQUNBLHNEQUFBO0VBQ0Esc0JBQUE7QUFQSjs7QUFVQTs7RUFBQTs7QUFJQTtFQUVJLG9EQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQVRKOztBQVlBO0VBRUksV0FBQTtFQUNBLHlCQUFBO0FBVko7O0FBYUE7RUFFSSxtQkFBQTtFQUNBLG9EQUFBO0VBQ0EseUJBQUE7QUFYSjs7QUFjQTs7RUFBQTs7QUFJQTtFQUVJLHFEQUFBO0VBQ0Esd0JBQUE7QUFiSjs7QUFnQkE7RUFFSSxVQUFBO0VBQ0Esd0JBQUE7QUFkSjs7QUFpQkE7RUFFSSx3QkFBQTtBQWZKIiwiZmlsZSI6ImFib3V0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lcntcblx0cGFkZGluZzo1JTtcblx0YmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG5cblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR3aWR0aDogOTAlO1xufVxuLnNjcm9sbF9zdHlsZTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJcbntcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4ICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsLjMpICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Q2MjkyOSAhaW1wb3J0YW50O1xufVxuI2Fib3V0X3NlY3Rpb257XG5cdC8qd2lkdGg6IDUwJTtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRtYXJnaW46IDBweDsqL1xuXHRoZWlnaHQ6IDEwMCU7XG5cdG1hcmdpbjogYXV0bztcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA4MCU7XG4gIC8qcGFkZGluZzogMTBweDsqL1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xuXG59XG4jc3BhY2Vye1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OjQwJTtcbn1cbnB7XG5cdGNvbG9yOiBsaWdodEdyZXk7XG59XG5oMXtcblx0Y29sb3I6ICNmZmQ3NDA7XG5cdGZvbnQtZmFtaWx5OiBSb2JvdG87XG5cdHZlcnRpY2FsLWFsaWduOiB0b3A7XG5cdGxpbmUtaGVpZ2h0OiA5MCU7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblxufVxuaDJ7XG5cdGZvbnQtZmFtaWx5OiBSb2JvdG87XG5cdGNvbG9yOiB3aGl0ZTtcbn1cblxuXG5cbi5zY3JvbGxiYXJcbntcbi8qICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xuICAgIGZsb2F0OiBsZWZ0OyovXG4vKiAgICBoZWlnaHQ6IDMwMHB4O1xuICAgIHdpZHRoOiA1NjVweDsqL1xuICAgXG4gICAgLypiYWNrZ3JvdW5kOiAjRjVGNUY1OyovXG4gICAgaGVpZ2h0OiA4MCU7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XG59XG5cbi5mb3JjZS1vdmVyZmxvd1xue1xuICAgIG1pbi1oZWlnaHQ6IDQ1MHB4O1xufVxuXG4jd3JhcHBlclxue1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogNTAwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xufVxuXG4vKlxuICogIFNUWUxFIDFcbiAqL1xuXG4jc3R5bGUtMTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2tcbntcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgyNTUsMCwwLDAuMyk7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xufVxuXG4jc3R5bGUtMTo6LXdlYmtpdC1zY3JvbGxiYXJcbntcbiAgICB3aWR0aDogMTJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xufVxuXG4jc3R5bGUtMTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJcbntcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDI1NSwwLDAsLjMpO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XG59XG5cbi8qXG4gKiAgU1RZTEUgMlxuICovXG5cbiNzdHlsZS0yOjotd2Via2l0LXNjcm9sbGJhci10cmFja1xue1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuMyk7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xufVxuXG4jc3R5bGUtMjo6LXdlYmtpdC1zY3JvbGxiYXJcbntcbiAgICB3aWR0aDogMTJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xufVxuXG4jc3R5bGUtMjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJcbntcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLC4zKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDYyOTI5O1xufVxuXG4vKlxuICogIFNUWUxFIDNcbiAqL1xuXG4jc3R5bGUtMzo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2tcbntcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwwLjYzKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XG59XG5cbiNzdHlsZS0zOjotd2Via2l0LXNjcm9sbGJhclxue1xuICAgIHdpZHRoOiA2cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuXG4jc3R5bGUtMzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJcbntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XG59Il19 */"] });
    return AboutComponent;
}());



/***/ }),

/***/ "8TUE":
/*!****************************************!*\
  !*** ./src/app/get-lat-lon.service.ts ***!
  \****************************************/
/*! exports provided: GetLatLonService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetLatLonService", function() { return GetLatLonService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var GetLatLonService = /** @class */ (function () {
    function GetLatLonService(http) {
        this.http = http;
        this.dataUrl = 'assets/data/locations_lat_lng.json';
    }
    GetLatLonService.prototype.getData = function () {
        return this.http.get(this.dataUrl);
    };
    GetLatLonService.ɵfac = function GetLatLonService_Factory(t) { return new (t || GetLatLonService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    GetLatLonService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GetLatLonService, factory: GetLatLonService.ɵfac, providedIn: 'root' });
    return GetLatLonService;
}());



/***/ }),

/***/ "A6hx":
/*!******************************************************************!*\
  !*** ./src/app/pollbook-dialogue/pollbook-dialogue.component.ts ***!
  \******************************************************************/
/*! exports provided: PollbookDialogueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PollbookDialogueComponent", function() { return PollbookDialogueComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "LcAk");
/* harmony import */ var _download_poll_books_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../download-poll-books.service */ "+5AN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "Xlwt");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "TY1r");








function PollbookDialogueComponent_div_0_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 9);
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx_r2.data.innerText, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
} }
function PollbookDialogueComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "About ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " in the years ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " from the History of Parliament website");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, PollbookDialogueComponent_div_0_div_10_Template, 1, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "here");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "mat-dialog-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PollbookDialogueComponent_div_0_Template_button_click_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r3.data.fetch = false; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Close and stop showing me these");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.data.constituency);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.data.yearRange);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.data.innerText);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("You can find out more about ", ctx_r0.data.constituency, " from the History of Parliament website, ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r0.data.url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function PollbookDialogueComponent_div_1_div_1_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" There is ", ctx_r6.data.num_results, " poll book available:");
} }
function PollbookDialogueComponent_div_1_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" There are ", ctx_r7.data.num_results, " poll books available:");
} }
function PollbookDialogueComponent_div_1_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Print or Manuscript? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Citation: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Holdings: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Source: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Election Code: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Notes: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "------------------------- ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var pollBook_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", pollBook_r9.PrintMS, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pollBook_r9.Citation);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pollBook_r9.Holdings);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pollBook_r9.Source);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pollBook_r9.ElectionCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pollBook_r9.Notes);
} }
function PollbookDialogueComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h2", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Poll Books");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PollbookDialogueComponent_div_1_div_1_span_3_Template, 3, 1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PollbookDialogueComponent_div_1_div_1_span_4_Template, 3, 1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " ------------------------- ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, PollbookDialogueComponent_div_1_div_1_div_6_Template, 28, 6, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PollbookDialogueComponent_div_1_div_1_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r11); var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r10.downloadPollBooks(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "cloud_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-dialog-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r5.data.num_results == 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r5.data.num_results > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r5.data.poll_books);
} }
function PollbookDialogueComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PollbookDialogueComponent_div_1_div_1_Template, 14, 3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.data.num_results);
} }
var PollbookDialogueComponent = /** @class */ (function () {
    function PollbookDialogueComponent(downloadPollBooksService, data) {
        this.downloadPollBooksService = downloadPollBooksService;
        this.data = data;
    }
    PollbookDialogueComponent.prototype.ngOnInit = function () {
        // console.log("got data in dialogue",this.data);
    };
    PollbookDialogueComponent.prototype.downloadPollBooks = function () {
        this.downloadPollBooksService.downloadFile(this.data.poll_books, 'pollBooks');
    };
    PollbookDialogueComponent.ɵfac = function PollbookDialogueComponent_Factory(t) { return new (t || PollbookDialogueComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_download_poll_books_service__WEBPACK_IMPORTED_MODULE_1__["DownloadPollBooksService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])); };
    PollbookDialogueComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PollbookDialogueComponent, selectors: [["app-pollbook-dialogue"]], decls: 2, vars: 2, consts: [["class", "dialogue_background", 4, "ngIf"], ["id", "my_poll_books", 4, "ngIf"], [1, "dialogue_background"], [1, "gradient"], ["mat-dialog-title", ""], [3, "innerHTML", 4, "ngIf"], ["target", "_blank", 3, "href"], ["mat-button", "", "mat-dialog-close", ""], ["mat-button", "", "mat-dialog-close", "", 3, "click"], [3, "innerHTML"], ["id", "my_poll_books"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["mat-icon-button", "", "aria-label", "button flavo", 3, "click"], [1, "poll_book_strong"], [2, "font-style", "italic"]], template: function PollbookDialogueComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, PollbookDialogueComponent_div_0_Template, 20, 5, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PollbookDialogueComponent_div_1_Template, 2, 1, "div", 1);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.data.innerText);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.data);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogClose"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"]], styles: ["#my_poll_books[_ngcontent-%COMP%] {\n  margin-top: 2%;\n  padding: 10px;\n  font-family: Lato;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white;\n  \n  width: 97%;\n  margin-bottom: 2%;\n  \n  border-radius: 10px 0px 0px 0px;\n}\n\n.poll_book_strong[_ngcontent-%COMP%] {\n  color: #0db9f0 !important;\n}\n\n.dialogue_background[_ngcontent-%COMP%] {\n  \n  padding: 2%;\n  \n}\n\n.gradient[_ngcontent-%COMP%] {\n  \n  width: 100%;\n  height: 300px;\n  \n  -webkit-mask-image: linear-gradient(to bottom, black, black, rgba(0, 0, 0, 0));\n}\n\na[_ngcontent-%COMP%]:link {\n  color: orange;\n}\n\n\n\na[_ngcontent-%COMP%]:visited {\n  color: purple;\n}\n\n\n\na[_ngcontent-%COMP%]:hover {\n  color: #0db9f0;\n}\n\n\n\na[_ngcontent-%COMP%]:active {\n  color: lightGrey;\n}\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3BvbGxib29rLWRpYWxvZ3VlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0EseUNBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLCtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUNBO0VBQ0UsK0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUFBO0VBQ0UscUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUVBLHNGQUFBO0VBQ0EsOEVBQUE7QUFFRjs7QUFBQTtFQUNFLGFBQUE7QUFHRjs7QUFBQSxpQkFBQTs7QUFDQTtFQUNFLGFBQUE7QUFHRjs7QUFBQSxvQkFBQTs7QUFDQTtFQUNFLGNBQUE7QUFHRjs7QUFBQSxrQkFBQTs7QUFDQTtFQUNFLGdCQUFBO0FBR0Y7O0FBREE7RUFDRSxxQkFBQTtBQUlGIiwiZmlsZSI6InBvbGxib29rLWRpYWxvZ3VlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI215X3BvbGxfYm9va3N7XG4gIG1hcmdpbi10b3A6IDIlO1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogTGF0bztcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjpyZ2JhKDAsMCwwLC44Nyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAvKlRPRE8gRklORCBPdXQgd2h5IHRoaXMgd2lkdGggaXMgd3JvbmchKi9cbiAgd2lkdGg6IDk3JTtcbiAgbWFyZ2luLWJvdHRvbTogMiU7XG4gIC8qb3ZlcmZsb3c6IHNjcm9sbDsqL1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDBweCAwcHggMHB4O1xuXG59XG4ucG9sbF9ib29rX3N0cm9uZ3tcbiAgY29sb3I6IzBkYjlmMCAhaW1wb3J0YW50O1xufVxuLmRpYWxvZ3VlX2JhY2tncm91bmR7XG4gIC8qYmFja2dyb3VuZC1jb2xvcjogbGlnaHRHcmV5OyovXG4gIHBhZGRpbmc6IDIlO1xuICAvKmNvbG9yOndoaXRlOyovXG59XG4uZ3JhZGllbnR7XG4gIC8qcG9zaXRpb246YWJzb2x1dGU7Ki9cbiAgd2lkdGg6MTAwJTtcbiAgaGVpZ2h0OjMwMHB4O1xuXG4gIC8qYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiKDY2LCAxMzQsIDI0NCksIHJnYig1OCwgMjU1LCAyMTkpKTsqL1xuICAtd2Via2l0LW1hc2staW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwwLDAsMSksIHJnYmEoMCwwLDAsMSksIHJnYmEoMCwwLDAsMCkpO1xufVxuYTpsaW5rIHtcbiAgY29sb3I6IG9yYW5nZTtcbn1cblxuLyogdmlzaXRlZCBsaW5rICovXG5hOnZpc2l0ZWQge1xuICBjb2xvcjogcHVycGxlO1xufVxuXG4vKiBtb3VzZSBvdmVyIGxpbmsgKi9cbmE6aG92ZXIge1xuICBjb2xvcjogIzBkYjlmMDtcbn1cblxuLyogc2VsZWN0ZWQgbGluayAqL1xuYTphY3RpdmUge1xuICBjb2xvcjogbGlnaHRHcmV5O1xufVxuYXtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuIl19 */"] });
    return PollbookDialogueComponent;
}());



/***/ }),

/***/ "C8p3":
/*!*******************************************!*\
  !*** ./src/app/get-poll-books.service.ts ***!
  \*******************************************/
/*! exports provided: GetPollBooksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetPollBooksService", function() { return GetPollBooksService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var GetPollBooksService = /** @class */ (function () {
    function GetPollBooksService(http) {
        this.http = http;
        //Beds_1705a/1 192.168.0.51
        ///dataUrl='http://192.168.0.51:8888/ECCPEC_code/php/getPollBooks.php/?BookCode=';
        // dataUrl='http://localhost:8888/ECCPEC_code/php/getPollBooks.php/?BookCode=';
        //dataUrl='/php/getPollBooks.php/?BookCode=';
        this.dataUrl = 'https://ecppec.ncl.ac.uk/php/getPollBooks.php/?BookCode=';
    }
    GetPollBooksService.prototype.getData = function (pollBookCode) {
        var fullURL = this.dataUrl + pollBookCode;
        console.log(fullURL);
        return this.http.get(fullURL);
    };
    GetPollBooksService.ɵfac = function GetPollBooksService_Factory(t) { return new (t || GetPollBooksService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    GetPollBooksService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GetPollBooksService, factory: GetPollBooksService.ɵfac, providedIn: 'root' });
    return GetPollBooksService;
}());



/***/ }),

/***/ "I5uy":
/*!********************************************!*\
  !*** ./src/app/geojson-service.service.ts ***!
  \********************************************/
/*! exports provided: GeojsonServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeojsonServiceService", function() { return GeojsonServiceService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var GeojsonServiceService = /** @class */ (function () {
    function GeojsonServiceService(http) {
        this.http = http;
        this.dataUrl = 'assets/data/england.json';
    }
    GeojsonServiceService.prototype.getData = function () {
        return this.http.get(this.dataUrl);
    };
    GeojsonServiceService.ɵfac = function GeojsonServiceService_Factory(t) { return new (t || GeojsonServiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    GeojsonServiceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GeojsonServiceService, factory: GeojsonServiceService.ɵfac, providedIn: 'root' });
    return GeojsonServiceService;
}());



/***/ }),

/***/ "Kvm9":
/*!************************************************!*\
  !*** ./src/app/dialogue/dialogue.component.ts ***!
  \************************************************/
/*! exports provided: DialogueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogueComponent", function() { return DialogueComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "LcAk");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "IRfi");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "A2Vd");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/autocomplete */ "NGqq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ "2+6u");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "j14s");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button-toggle */ "rKiy");














function DialogueComponent_mat_option_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    var option_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", option_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", option_r5, " ");
} }
function DialogueComponent_span_31_Template(rf, ctx) { if (rf & 1) {
    var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_span_31_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8); var constituency_r6 = ctx.$implicit; var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r7.constituencyClick(constituency_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    var constituency_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", constituency_r6, " ");
} }
function DialogueComponent_span_78_Template(rf, ctx) { if (rf & 1) {
    var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_span_78_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11); var year_r9 = ctx.$implicit; var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r10.yearClick(year_r9); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    var year_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", year_r9, " ");
} }
function DialogueComponent_span_79_Template(rf, ctx) { if (rf & 1) {
    var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_span_79_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); var month_r12 = ctx.$implicit; var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r13.monthClick(month_r12); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    var month_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", month_r12, " ");
} }
// import { EPERM } from 'constants';
var DialogueComponent = /** @class */ (function () {
    //	constructor(private downloadPollBooksService: DownloadPollBooksService, @Inject(MAT_DIALOG_DATA) public data: any) { }
    function DialogueComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.filteredValues = {
            Month: '', Constituency: '', Year: '', CountyBoroughUniv: '', Contested: '', ByElectionGeneral: '', PollBookCode: ''
        };
        this.constituencyList = [];
        this.constituencyOptions = ["York", "Leeds", "Devon"];
        this.monthList = [];
        this.yearList = [];
        this.constituencyFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.monthFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.yearFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.yearFromFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]({ value: '', disabled: true });
        this.yearToFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]({ value: '', disabled: true });
        this.countyFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.contestedFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.byElectionGeneralFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.pollBookCodeFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.yearChooser = "single";
    }
    DialogueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constituencyOptions = this.getConstituencyNames(this.data).sort(function (a, b) { return a > b ? 1 : a === b ? 0 : -1; });
        this.filteredConstituencyOptions = this.constituencyFilter.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return _this._filter(value); }));
        this.countyFilter.valueChanges.subscribe(function (countyFilterValue) {
            _this.filteredConstituencyOptions = _this.constituencyFilter.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return _this._filter(value); }));
            _this.constituencyOptions = _this.getFilteredConstituencyNames(_this.data, countyFilterValue.substring(0, 1)).sort(function (a, b) { return a > b ? 1 : a === b ? 0 : -1; });
        });
    };
    DialogueComponent.prototype.consituencyFieldClicked = function () {
        // console.log("clicked con");
        // this.constituencyOptions = this.getFilteredConstituencyNames(this.data, this.countyFilter.value.substring(0,1)).sort((a, b) => a > b ? 1 : a === b ? 0 : -1);
    };
    // sortBy() {
    // 	return this.constituencyOptions.sort((a, b) => a > b ? 1 : a === b ? 0 : -1);
    //   }
    DialogueComponent.prototype.getConstituencyNames = function (elections) {
        var names = [];
        elections.forEach(function (element) {
            names.push(element.constituency);
        });
        return names;
    };
    DialogueComponent.prototype.getFilteredConstituencyNames = function (elections, type) {
        var names = [];
        elections.forEach(function (element) {
            if (element.countyboroughuniv == type)
                names.push(element.constituency);
        });
        return names;
    };
    DialogueComponent.prototype.arrToCommaSeparatedString = function (list, value) {
        var listString = "";
        if (value != null) {
            if (value.length > 0) {
                listString = value;
            }
            else {
                for (var i = 0; i < list.length; i++) {
                    listString += list[i] + ",";
                }
            }
        }
        return listString.slice(0, -1);
    };
    DialogueComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.constituencyOptions.filter(function (option) { return option.toLowerCase().includes(filterValue); });
    };
    DialogueComponent.prototype.closeWithRandomSearch = function () {
        var obj = {
            triggerRandomSearch: true,
            updateSearch: false,
            constituency: "",
            month: "",
            year: "",
            country: "",
            contested: "",
            byElectionGeneral: "",
            pollBookCode: ""
        };
        this.dialogRef.close(obj);
    };
    DialogueComponent.prototype.save = function () {
        var yearVal = "";
        if (this.yearChooser == "single") {
            if (this.yearFilter.value != null) {
                if (this.yearFilter.value.length >= 4) {
                    yearVal = this.yearFilter.value;
                }
            }
        }
        else if (this.yearChooser == "list") {
            if (this.yearList.length > 0) {
                yearVal = this.arrToCommaSeparatedString(this.yearList, this.yearFilter.value);
            }
        }
        // if(this.yearFilter.value!=null){
        // 	if(this.yearFilter.value.length>=4){
        // 	}
        // }
        if (this.yearFromFilter.value != null && this.yearToFilter.value != null) {
            if (this.yearFromFilter.value.length == 4 && this.yearToFilter.value.length == 4) {
                yearVal = this.yearFromFilter.value + "-" + this.yearToFilter.value;
            }
        }
        var obj = {
            updateSearch: true,
            constituency: this.arrToCommaSeparatedString(this.constituencyList, this.constituencyFilter.value),
            month: this.arrToCommaSeparatedString(this.monthList, this.monthFilter.value),
            year: yearVal,
            county: this.countyFilter.value,
            contested: this.contestedFilter.value,
            byElectionGeneral: this.byElectionGeneralFilter.value,
            pollBookCode: this.pollBookCodeFilter.value
        };
        this.dialogRef.close(obj);
    };
    DialogueComponent.prototype.close = function () {
        console.log("closed");
        var obj = {
            updateSearch: false,
            constituency: "",
            month: "",
            year: "",
            country: "",
            contested: "",
            byElectionGeneral: "",
            pollBookCode: ""
        };
        this.dialogRef.close(obj);
    };
    DialogueComponent.prototype.getConstituencies = function () {
        return this.constituencyList;
        // if(this.constituencyFilter.value!=null){
        // 	return this.constituencyFilter.value.split(",");
        // }
    };
    DialogueComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode === 13) {
            this.constituencyList.push(this.constituencyFilter.value);
            this.constituencyFilter.setValue("");
        }
    };
    DialogueComponent.prototype.yearKeyDownFunction = function (event) {
        if (event.keyCode === 13) {
            if (this.yearChooser == "list") {
                this.yearList.push(this.yearFilter.value);
                this.yearFilter.setValue("");
            }
        }
        // else if(this.yearChooser == "single"){
        // 	this.yearList.push(this.yearFilter.value);
        // }
    };
    // yearKeyDownFromFunction(event) {
    // 	if (event.keyCode === 13) {
    // 		if(this.yearChooser == "range"){}
    // 		//	this.yearList.push(this.yearFromFilter.value);
    // 		this.yearFilter.setValue(this.yearFromFilter.value);
    // 	}
    // }
    // yearKeyDownToFunction(event) {
    // 	if (event.keyCode === 13) {
    // 		if(this.yearChooser == "range"){}
    // 		//	this.yearList.push(this.yearFromFilter.value);
    // 		this.yearFilter.setValue(this.yearFilter.value+"-"+this.yearToFilter.value);
    // 	}
    // }
    DialogueComponent.prototype.yearButtonChange = function (val) {
        console.log("button", val);
        this.yearChooser = val;
        if (val == "single" || val == "list") {
            this.yearToFilter.setValue("");
            this.yearFromFilter.setValue("");
            this.yearFilter.enable();
            this.yearFromFilter.disable();
            this.yearToFilter.disable();
        }
        else if (val == "range") {
            this.yearFilter.setValue("");
            this.yearFilter.disable();
            this.yearFromFilter.enable();
            this.yearToFilter.enable();
        }
    };
    DialogueComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    DialogueComponent.prototype.monthChange = function (event) {
        // if (event.keyCode === 13) {
        if (this.monthList.includes(this.monthFilter.value)) {
            alert("You already have that month in your list!");
            this.monthFilter.setValue("");
        }
        else {
            this.monthList.push(this.monthFilter.value);
            this.monthFilter.setValue("");
        }
        // }
    };
    DialogueComponent.prototype.constituencyClick = function (constituency) {
        this.constituencyList = this.constituencyList.filter(function (e) { return e !== constituency; });
    };
    DialogueComponent.prototype.monthClick = function (month) {
        this.monthList = this.monthList.filter(function (e) { return e !== month; });
    };
    DialogueComponent.prototype.yearClick = function (year) {
        this.yearList = this.yearList.filter(function (e) { return e !== year; });
    };
    DialogueComponent.ɵfac = function DialogueComponent_Factory(t) { return new (t || DialogueComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
    DialogueComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: DialogueComponent, selectors: [["app-dialogue"]], decls: 125, vars: 22, consts: [["id", "dialogue_form_info"], [2, "color", "#673ab7 !important", "cursor", "pointer", 3, "click"], [1, "dialogue_form", 3, "keydown"], ["type", "text", "placeholder", "....", "aria-label", "Constituency", "matInput", "", 3, "formControl", "matAutocomplete", "click"], ["auto", "matAutocomplete"], [3, "value", 4, "ngFor", "ngForOf"], ["align", "end"], ["appearance", "fill", 1, "dialogue_form"], [3, "formControl", "value"], ["value", ""], ["value", "C"], ["value", "B"], ["value", "U"], ["class", "input_list", "style", "margin:5px;background-color: lightGrey; border-radius: 3px; padding-left:5px;padding-right:5px; padding-top:3px;padding-bottom:3px", 4, "ngFor", "ngForOf"], [2, "font-family", "Catamaran"], ["value", "single", "name", "fontStyle", "aria-label", "Font Style", 3, "selectionChange"], ["value", "single", 3, "click"], ["value", "list", 3, "click"], ["value", "range", 3, "click"], ["appearance", "fill", 1, "dialogue_form", 3, "keydown"], ["maxlength", "4", "matInput", "", "placeholder", "....", 1, "form-field", 3, "formControl", "keypress"], ["align", "end", 3, "hidden"], [3, "formControl", "value", "selectionChange"], ["value", "Jan"], ["value", "Feb"], ["value", "Mar"], ["value", "Apr"], ["value", "May"], ["value", "Jun"], ["value", "Jul"], ["value", "Aug"], ["value", "Sep"], ["value", "Oct"], ["value", "Nov"], ["value", "Dec"], ["value", "Y"], ["value", "N"], ["value", "G"], ["matDialogClose", "", 1, "mat-raised-button", 2, "margin-right", "1%", 3, "click"], ["matDialogClose", "", 1, "mat-raised-button", "mat-primary", 3, "click"], [3, "value"], [1, "input_list", 2, "margin", "5px", "background-color", "lightGrey", "border-radius", "3px", "padding-left", "5px", "padding-right", "5px", "padding-top", "3px", "padding-bottom", "3px"], [2, "color", "white", "cursor", "pointer", 3, "click"]], template: function DialogueComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-dialog-content");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Use this box to search the database of elections. You can add more than one filter at a time, for instance by entering a constituency and a year. You'll see the search results both in the table and on the map. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "If you're not sure what to look for, try a ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_span_click_6_listener() { return ctx.closeWithRandomSearch(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "random search ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " to explore the data. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-form-field", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown", function DialogueComponent_Template_mat_form_field_keydown_9_listener($event) { return ctx.keyDownFunction($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Constituency");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "input", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_input_click_12_listener() { return ctx.consituencyFieldClicked(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-autocomplete", null, 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, DialogueComponent_mat_option_15_Template, 2, 2, "mat-option", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](16, "async");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "mat-hint", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Press enter to add more than one");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "County/Borough/Univ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "mat-select", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "mat-option", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Any");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "mat-option", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "County");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "mat-option", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Borough");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "mat-option", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "University");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, DialogueComponent_span_31_Template, 4, 1, "span", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Use a single year, a list of years or a range: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "mat-button-toggle-group", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function DialogueComponent_Template_mat_button_toggle_group_selectionChange_35_listener($event) { return ctx.yearButtonChange($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "mat-button-toggle", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_mat_button_toggle_click_36_listener() { return ctx.yearButtonChange("single"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "Single");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "mat-button-toggle", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_mat_button_toggle_click_38_listener() { return ctx.yearButtonChange("list"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, "List");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "mat-button-toggle", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_mat_button_toggle_click_40_listener() { return ctx.yearButtonChange("range"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "Range");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "mat-form-field", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown", function DialogueComponent_Template_mat_form_field_keydown_42_listener($event) { return ctx.yearKeyDownFunction($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Year");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "input", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keypress", function DialogueComponent_Template_input_keypress_45_listener($event) { return ctx.numberOnly($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "mat-hint", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Press enter to add more than one");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "Month");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "mat-select", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function DialogueComponent_Template_mat_select_selectionChange_51_listener($event) { return ctx.monthChange($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "mat-option", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, "January");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "mat-option", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](55, "February");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "mat-option", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](57, "March");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "mat-option", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](59, "April");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "mat-option", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](61, "May");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "mat-option", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](63, "June");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "mat-option", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](65, "July");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "mat-option", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67, "August");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "mat-option", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](69, "September");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "mat-option", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](71, "October");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "mat-option", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](73, "November");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](74, "mat-option", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](75, "December");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "mat-hint", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](77, "You can add more than one");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](78, DialogueComponent_span_78_Template, 4, 1, "span", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](79, DialogueComponent_span_79_Template, 4, 1, "span", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](80, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](83, "From Year");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "input", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keypress", function DialogueComponent_Template_input_keypress_84_listener($event) { return ctx.numberOnly($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](86, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](87, "To Year");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](88, "input", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keypress", function DialogueComponent_Template_input_keypress_88_listener($event) { return ctx.numberOnly($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](89, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](91, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](92, "Contested?");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](93, "mat-select", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "mat-option", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](95, "Any");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "mat-option", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, "Yes");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "mat-option", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](99, "No");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](101, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](102, "By/General Election ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](103, "mat-select", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](104, "mat-option", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](105, "Any");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](106, "mat-option", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](107, "By Election");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "mat-option", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, "General Election");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "mat-form-field", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "mat-label");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](112, "Has Poll Books? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](113, "mat-select", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "mat-option", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](115, "Any");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "mat-option", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](117, "Yes");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "mat-option", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, "No");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "mat-dialog-actions");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "button", 38);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_button_click_121_listener() { return ctx.close(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](122, "Dismiss");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](123, "button", 39);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DialogueComponent_Template_button_click_123_listener() { return ctx.save(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](124, "Search the database");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.constituencyFilter)("matAutocomplete", _r0);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](16, 20, ctx.filteredConstituencyOptions));
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.countyFilter)("value", ctx.countyFilter.value);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.getConstituencies());
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.yearFilter);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("hidden", ctx.yearChooser != "list");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.monthFilter)("value", ctx.monthFilter.value);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](27);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.yearList);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.monthList);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.yearFromFilter);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.yearToFilter);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.contestedFilter)("value", ctx.contestedFilter.value);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.byElectionGeneralFilter)("value", ctx.byElectionGeneralFilter.value);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.pollBookCodeFilter)("value", ctx.pollBookCodeFilter.value);
        } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteTrigger"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlDirective"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__["MatAutocomplete"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatHint"], _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatOption"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__["MatButtonToggle"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["MaxLengthValidator"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: ["#modal_content[_ngcontent-%COMP%] {\n  text-align: center;\n  position: relative;\n}\n\n  mat-dialog-container {\n  \n  \n  height: 10% !important;\n}\n\n#dialogue_form_info[_ngcontent-%COMP%] {\n  font-family: Catamaran;\n}\n\n.input_list[_ngcontent-%COMP%] {\n  border-radius: 3px;\n  background-color: darkGrey !important;\n}\n\n.dialogue_form[_ngcontent-%COMP%] {\n  margin: 1%;\n}\n\n#back_image_ground[_ngcontent-%COMP%] {\n  opacity: 50%;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n  \n}\n\nh1[_ngcontent-%COMP%] {\n  color: #0db9f0;\n  font-size: 200%;\n}\n\n#inner[_ngcontent-%COMP%] {\n  padding: 5%;\n  position: relative;\n  z-index: 100;\n}\n\n#modal_credit[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0px;\n}\n\n.image_credit[_ngcontent-%COMP%] {\n  background-color: rgba(200, 200, 200, 0.5);\n  padding: 10px;\n  border-radius: 10px 0px 0px 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RpYWxvZ3VlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Msa0JBQUE7RUFDQSxrQkFBQTtBQUNEOztBQU1ZO0VBQ1gsOENBQUE7RUFDQSwyQkFBQTtFQUNBLHNCQUFBO0FBSEQ7O0FBU0E7RUFDQyxzQkFBQTtBQU5EOztBQVFBO0VBQ0Msa0JBQUE7RUFDQSxxQ0FBQTtBQUxEOztBQU9BO0VBQ0MsVUFBQTtBQUpEOztBQU1BO0VBQ0MsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0Esb0JBQUE7QUFIRDs7QUFLQTtFQUNDLGNBQUE7RUFDQSxlQUFBO0FBRkQ7O0FBT0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQyxZQUFBO0FBSkg7O0FBTUE7RUFDQyxrQkFBQTtFQUNBLFdBQUE7QUFIRDs7QUFLQTtFQUNDLDBDQUFBO0VBQ0EsYUFBQTtFQUNBLCtCQUFBO0FBRkQiLCJmaWxlIjoiZGlhbG9ndWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbW9kYWxfY29udGVudHtcblx0dGV4dC1hbGlnbjpjZW50ZXI7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuXHR9XG4uY2RrLW92ZXJsYXktcGFuZXtcblxuXG59XG46Om5nLWRlZXAgeyBtYXQtZGlhbG9nLWNvbnRhaW5lciB7XG5cdC8qYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwLDUwLDUwKSAhaW1wb3J0YW50OyovXG5cdC8qY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7Ki9cblx0aGVpZ2h0OjEwJSAhaW1wb3J0YW50O1xufVxufVxuI2Nkay1vdmVybGF5LTB7XG5cbn1cbiNkaWFsb2d1ZV9mb3JtX2luZm97XG5cdGZvbnQtZmFtaWx5OiBDYXRhbWFyYW47XG59XG4uaW5wdXRfbGlzdHtcblx0Ym9yZGVyLXJhZGl1czogM3B4O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrR3JleSAhaW1wb3J0YW50O1xufVxuLmRpYWxvZ3VlX2Zvcm17XG5cdG1hcmdpbjogMSU7XG59XG4jYmFja19pbWFnZV9ncm91bmR7XG5cdG9wYWNpdHk6IDUwJTtcblx0aGVpZ2h0OjEwMCU7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0d2lkdGg6IDEwMCU7XG5cdHotaW5kZXg6IDE7XG5cdC8qb3ZlcmZsb3c6IGhpZGRlbjsqL1xufVxuaDF7XG5cdGNvbG9yOiMwZGI5ZjA7XG5cdGZvbnQtc2l6ZTogMjAwJTtcbn1cbmgxIGgyIGRpdntcblxufVxuI2lubmVye1xuXHRcdHBhZGRpbmc6IDUlO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRcdHotaW5kZXg6IDEwMDtcbn1cbiNtb2RhbF9jcmVkaXR7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0Ym90dG9tOjBweDtcbn1cbi5pbWFnZV9jcmVkaXR7XG5cdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAwLDIwMCwyMDAsMC41KTtcblx0cGFkZGluZzoxMHB4O1xuXHRib3JkZXItcmFkaXVzOiAxMHB4IDBweCAwcHggMHB4O1xuXG59Il19 */"] });
    return DialogueComponent;
}());



/***/ }),

/***/ "OWwv":
/*!**********************************************!*\
  !*** ./src/app/outputs/outputs.component.ts ***!
  \**********************************************/
/*! exports provided: OutputsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputsComponent", function() { return OutputsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var OutputsComponent = /** @class */ (function () {
    function OutputsComponent() {
    }
    OutputsComponent.prototype.ngOnInit = function () {
    };
    OutputsComponent.ɵfac = function OutputsComponent_Factory(t) { return new (t || OutputsComponent)(); };
    OutputsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OutputsComponent, selectors: [["app-outputs"]], decls: 2, vars: 0, template: function OutputsComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "outputs works!");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvdXRwdXRzLmNvbXBvbmVudC5zY3NzIn0= */"] });
    return OutputsComponent;
}());



/***/ }),

/***/ "OdKX":
/*!************************************!*\
  !*** ./src/app/borough.service.ts ***!
  \************************************/
/*! exports provided: BoroughService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoroughService", function() { return BoroughService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var BoroughService = /** @class */ (function () {
    function BoroughService(http) {
        this.http = http;
        this.dataUrl = 'assets/data/borough_locations.json';
    }
    // dataUrl='/ECPPEC/php/getElections.php';
    BoroughService.prototype.getData = function () {
        return this.http.get(this.dataUrl);
    };
    BoroughService.ɵfac = function BoroughService_Factory(t) { return new (t || BoroughService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    BoroughService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: BoroughService, factory: BoroughService.ɵfac, providedIn: 'root' });
    return BoroughService;
}());



/***/ }),

/***/ "Q1M9":
/*!**************************************!*\
  !*** ./src/app/centroids.service.ts ***!
  \**************************************/
/*! exports provided: CentroidsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CentroidsService", function() { return CentroidsService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var CentroidsService = /** @class */ (function () {
    function CentroidsService(http) {
        this.http = http;
        this.dataUrl = 'assets/data/centroids.json';
    }
    CentroidsService.prototype.getData = function () {
        return this.http.get(this.dataUrl);
    };
    CentroidsService.ɵfac = function CentroidsService_Factory(t) { return new (t || CentroidsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    CentroidsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CentroidsService, factory: CentroidsService.ɵfac, providedIn: 'root' });
    return CentroidsService;
}());



/***/ }),

/***/ "RFKS":
/*!******************************************!*\
  !*** ./src/app/get-elections.service.ts ***!
  \******************************************/
/*! exports provided: GetElectionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetElectionsService", function() { return GetElectionsService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var GetElectionsService = /** @class */ (function () {
    function GetElectionsService(http) {
        this.http = http;
        //
        //dataUrl='http://192.168.0.51:8888/ECCPEC_code/PHP/getElections.php';
        //dataUrl='http://localhost:9999/ECCPEC_code/PHP/getElections.php';
        //	dataUrl='/ECPPEC/php/getElections.php';
        //dataUrl='https://ecppec.ncl.ac.uk/php/getElections.php'
        this.dataUrl = 'https://ecppec.ncl.ac.uk/php/getElections.php';
    }
    //dataUrl='/php/getElections.php';
    GetElectionsService.prototype.getData = function () {
        return this.http.get(this.dataUrl);
    };
    GetElectionsService.ɵfac = function GetElectionsService_Factory(t) { return new (t || GetElectionsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    GetElectionsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GetElectionsService, factory: GetElectionsService.ɵfac, providedIn: 'root' });
    return GetElectionsService;
}());



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "LcAk");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ "TY1r");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ "RzEb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");







// 
// @Component({
//   selector: 'dialog-elements-example-dialog',
//   templateUrl: './dialog-elements-example-dialog.html',
// })
// export class DialogElementsExampleDialog {}
var AppComponent = /** @class */ (function () {
    function AppComponent(dialog) {
        this.dialog = dialog;
        // 
        //zoom: number = 7;
        this.navSwitch = "switch_right";
    }
    // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    AppComponent.prototype.openDialog = function () {
    };
    AppComponent.prototype.ngOnChanges = function (changes) {
        // changes.prop contains the old and the new value...
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.dialog.open(DialogueComponent);
        this.myInnerHeight = window.innerHeight;
        this.sideBarContentHeight = this.myInnerHeight * 0.5;
        this.sideBarWidth = window.innerWidth * 0.15;
        console.log("innerHeight", this.myInnerHeight);
        setTimeout(function () {
            _this.isShowing = true;
        }, 1000);
    };
    AppComponent.prototype.toggleSidenav = function () {
        this.isShowing = !this.isShowing;
        if (this.isShowing) {
            this.navSwitch = "switch_right";
        }
        else {
            this.navSwitch = "switch_left";
        }
    };
    AppComponent.prototype.onResize = function (event) {
        // event.target.innerWidth;
        this.myInnerHeight = event.target.innerHeight;
        console.log(this.myInnerHeight);
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"])); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["my-app"]], hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function AppComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
        } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 39, vars: 8, consts: [["id", "container", 1, "style-3"], ["id", "nav_toggle"], ["color", "accent", "aria-hidden", "false", "aria-label", "Example home icon", 2, "font-size", "400%", "margin-right", "5%", 3, "click"], ["id", "info"], ["src", "./assets/images/logos/newcastle.png", "alt", "newcastle university logo", 2, "width", "200px", "margin-right", "2%"], ["src", "./assets/images/logos/liverpool.png", "alt", "liverpool university logo", 2, "width", "200px", "margin-right", "2%"], ["src", "./assets/images/logos/ahrc.png", "alt", "arts and humanities research council logo", 2, "width", "200px", "margin-right", "2%"], [1, "gradient", 2, "overflow", "hidden", "background-color", "rgba(0,0,0,0)"], ["fixedInViewport", "true", "mode", "side", 1, "main-menu-sidenav", 2, "overflow", "hidden", "background-color", "rgba(0,0,0,0)", 3, "opened"], ["drawer", ""], ["id", "main_nav_content"], ["id", "spacer", 2, "margin-top", "100%"], ["color", "accent", "aria-hidden", "false", "aria-label", "Example home icon", 1, "link_icon"], ["routerLink", "/viz", "routerLinkActive", "active"], [1, "nav_label"], ["routerLink", "/about", "routerLinkActive", "active"], ["routerLink", "/team", "routerLinkActive", "active"], ["routerLink", "/api", "routerLinkActive", "active"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_mat_icon_click_2_listener() { return ctx.toggleSidenav(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-drawer-container", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-drawer", 8, 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-icon", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "poll");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "MAPS");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-icon", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "info");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "ABOUT");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-icon", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "a", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "group");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "TEAM");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "mat-icon", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "architecture");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "DATA");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "router-outlet");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("height", ctx.myInnerHeight, "px");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.navSwitch);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("height", ctx.myInnerHeight, "px");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("height", ctx.myInnerHeight, "px");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("opened", ctx.isShowing);
        } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIcon"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatDrawerContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatDrawer"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkActive"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"]], styles: ["#container[_ngcontent-%COMP%] {\n  width: 100%;\n  position: relative;\n}\n#logos[_ngcontent-%COMP%] {\n  \n}\n#info[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 5%;\n  left: 1%;\n  z-index: 5;\n  width: 1200px;\n}\n#nav_toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 5%;\n  left: 1%;\n  z-index: 5000;\n  width: 1200px;\n}\n.nav_label[_ngcontent-%COMP%] {\n  text-align: center;\n  \n  font-family: Catamaran;\n}\n.scroll_style[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border-radius: 10px !important;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;\n  background-color: #D62929 !important;\n}\n.material-icons.orange600[_ngcontent-%COMP%] {\n  color: #FB8C00;\n}\n\n.link_icon[_ngcontent-%COMP%] {\n  font-size: 60pt;\n  width: 60pt;\n  \n}\n.main-menu-sidenav[_ngcontent-%COMP%] {\n  color: white;\n  background-color: rgba(210, 10, 10, 0.1);\n  padding: 20px;\n  min-width: 100px;\n  \n}\n#sidebar_content[_ngcontent-%COMP%] {\n  width: 40%;\n  text-align: justify;\n  overflow: scroll;\n  overflow-x: hidden;\n  padding-right: 10%;\n}\n#main_nav_content[_ngcontent-%COMP%] {\n  padding: 3%;\n  \n}\n.nav_item[_ngcontent-%COMP%] {\n  \n  \n  font-family: Roboto;\n  margin-bottom: 4%;\n  font-size: 180%;\n  padding: 2%;\n}\na[_ngcontent-%COMP%]:link {\n  color: orange;\n}\n\na[_ngcontent-%COMP%]:visited {\n  color: purple;\n}\n\na[_ngcontent-%COMP%]:hover {\n  color: #0db9f0;\n}\n\na[_ngcontent-%COMP%]:active {\n  color: lightGrey;\n}\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n#titles[_ngcontent-%COMP%] {\n  border-color: orange !important;\n  border-left: 10px solid;\n  \n}\n.gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  \n  -webkit-mask-image: linear-gradient(to bottom, black, black, rgba(0, 0, 0, 0));\n}\n#my_sub[_ngcontent-%COMP%] {\n  margin-left: 1%;\n  font-size: 100%;\n  vertical-align: top;\n  font-family: Roboto;\n  font-weight: bold;\n}\n#my_title[_ngcontent-%COMP%] {\n  margin-left: 1%;\n  font-size: 330%;\n  vertical-align: top;\n  font-family: Roboto;\n  font-weight: bold;\n}\nnav[_ngcontent-%COMP%] {\n  float: right;\n  margin-right: 5%;\n}\n.style-3[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.63);\n  background-color: orange;\n}\n.style-3[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  background-color: orange;\n}\n.style-3[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: orange;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztFQUFBO0FBUUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFGRjtBQU1BO0VBQ0E7O2VBQUE7QUFEQTtBQUtBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0FBRkY7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtBQUZGO0FBS0E7RUFDRSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7QUFGRjtBQUlBO0VBRUksOEJBQUE7RUFDQSwrREFBQTtFQUNBLG9DQUFBO0FBRko7QUFJQTtFQUE0QixjQUFBO0FBQTVCO0FBRUE7Ozs7Ozs7Ozs7Ozs7RUFBQTtBQWVBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFFQSxxQkFBQTtBQURGO0FBR0E7RUFDRSxZQUFBO0VBQ0Esd0NBQUE7RUFHQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtBQUZGO0FBS0E7RUFDRSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFGRjtBQU1BO0VBQ0UsV0FBQTtFQUVBLGFBQUE7QUFKRjtBQU1BO0VBQ0MsMEJBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBSEQ7QUFLQTtFQUNFLGFBQUE7QUFGRjtBQUtBLGlCQUFBO0FBQ0E7RUFDRSxhQUFBO0FBRkY7QUFLQSxvQkFBQTtBQUNBO0VBQ0UsY0FBQTtBQUZGO0FBS0Esa0JBQUE7QUFDQTtFQUNFLGdCQUFBO0FBRkY7QUFJQTtFQUNFLHFCQUFBO0FBREY7QUFJQTtFQUNFLCtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQURGO0FBS0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBRUEsc0ZBQUE7RUFDQSw4RUFBQTtBQUhGO0FBTUE7RUFDRSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUhGO0FBS0E7RUFDRSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUZGO0FBSUE7RUFFRSxZQUFBO0VBQ0EsZ0JBQUE7QUFGRjtBQVFBO0VBRUkscURBQUE7RUFDQSx3QkFBQTtBQU5KO0FBU0E7RUFFSSxVQUFBO0VBQ0Esd0JBQUE7QUFQSjtBQVVBO0VBRUksd0JBQUE7QUFSSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi5leGFtcGxlLWNvbnRhaW5lciB7XG4gIHdpZHRoOjEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIFxufSovXG4qIHtcbiAgXG59XG4jY29udGFpbmVye1xuICB3aWR0aDoxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cblxuI2xvZ29ze1xuLyogIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6MSU7XG4gIGJvdHRvbToxJTsqL1xufVxuI2luZm97XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOjUlO1xuICBsZWZ0OjElO1xuICB6LWluZGV4OiA1O1xuICB3aWR0aDoxMjAwcHg7XG4gIFxufVxuI25hdl90b2dnbGV7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOjUlO1xuICBsZWZ0OjElO1xuICB6LWluZGV4OiA1MDAwO1xuICB3aWR0aDoxMjAwcHg7XG4gIFxufVxuLm5hdl9sYWJlbHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAvKmZvbnQtZmFtaWx5OiBMYXRvOyovXG4gIGZvbnQtZmFtaWx5OiBDYXRhbWFyYW47XG59XG4uc2Nyb2xsX3N0eWxlOjotd2Via2l0LXNjcm9sbGJhci10aHVtYlxue1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHggIWltcG9ydGFudDtcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMykgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDYyOTI5ICFpbXBvcnRhbnQ7XG59XG4ubWF0ZXJpYWwtaWNvbnMub3JhbmdlNjAwIHsgY29sb3I6ICNGQjhDMDA7IH1cblxuLyo6Om5nLWRlZXAgeyBkcmF3ZXIge1xuXG4gb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xufVxuXG59XG5cblxuOjpuZy1kZWVwIHsgbWF0LWRyYXdlci1jb250YWluZXIge1xuXG4gb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xufVxuXG59Ki9cblxuLmxpbmtfaWNvbntcbiAgZm9udC1zaXplOiA2MHB0OyAgXG4gIHdpZHRoOiA2MHB0O1xuXG4gIC8qbWFyZ2luLXJpZ2h0OiAxNSU7Ki9cbn1cbi5tYWluLW1lbnUtc2lkZW5hdiB7XG4gIGNvbG9yOndoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxMCwxMCwxMCwwLjEpO1xuXG4gIFxuICBwYWRkaW5nOiAyMHB4O1xuICBtaW4td2lkdGg6IDEwMHB4O1xuICAvKm92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsqL1xufSBcblxuI3NpZGViYXJfY29udGVudHtcbiAgd2lkdGg6IDQwJTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBwYWRkaW5nLXJpZ2h0OiAxMCU7XG5cbn1cblxuI21haW5fbmF2X2NvbnRlbnR7XG4gIHBhZGRpbmc6IDMlO1xuXG4gIC8qd2lkdGg6MjAlOyovXG59XG4ubmF2X2l0ZW17XG4gLypiYWNrZ3JvdW5kLWNvbG9yOiBncmV5OyovXG4gLyptYXJnaW46IDMlOyovXG4gZm9udC1mYW1pbHk6IFJvYm90bztcbiBtYXJnaW4tYm90dG9tOiA0JTtcbiBmb250LXNpemU6IDE4MCU7XG4gcGFkZGluZzogMiU7XG59XG5hOmxpbmsge1xuICBjb2xvcjogb3JhbmdlO1xufVxuXG4vKiB2aXNpdGVkIGxpbmsgKi9cbmE6dmlzaXRlZCB7XG4gIGNvbG9yOiBwdXJwbGU7XG59XG5cbi8qIG1vdXNlIG92ZXIgbGluayAqL1xuYTpob3ZlciB7XG4gIGNvbG9yOiAjMGRiOWYwO1xufVxuXG4vKiBzZWxlY3RlZCBsaW5rICovXG5hOmFjdGl2ZSB7XG4gIGNvbG9yOiBsaWdodEdyZXk7XG59XG5he1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbiN0aXRsZXN7XG4gIGJvcmRlci1jb2xvcjpvcmFuZ2UgIWltcG9ydGFudDtcbiAgYm9yZGVyLWxlZnQ6MTBweCBzb2xpZDtcbiAgLyptYXJnaW4tbGVmdDoyJTsqL1xuXG59XG5cbi5ncmFkaWVudHtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIHdpZHRoOjEwMCU7XG4gIGhlaWdodDoxMDAlO1xuXG4gIC8qYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiKDY2LCAxMzQsIDI0NCksIHJnYig1OCwgMjU1LCAyMTkpKTsqL1xuICAtd2Via2l0LW1hc2staW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwwLDAsMSksIHJnYmEoMCwwLDAsMSksIHJnYmEoMCwwLDAsMCkpO1xufVxuXG4jbXlfc3Vie1xuICBtYXJnaW4tbGVmdDoxJTtcbiAgZm9udC1zaXplOiAxMDAlO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICBmb250LXdlaWdodDpib2xkO1xufVxuI215X3RpdGxle1xuICBtYXJnaW4tbGVmdDoxJTtcbiAgZm9udC1zaXplOiAzMzAlO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBmb250LWZhbWlseTogUm9ib3RvO1xuICBmb250LXdlaWdodDpib2xkO1xufVxubmF2e1xuXG4gIGZsb2F0OnJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6NSU7XG59XG5we1xuXG59XG5cbi5zdHlsZS0zOjotd2Via2l0LXNjcm9sbGJhci10cmFja1xue1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuNjMpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbn1cblxuLnN0eWxlLTM6Oi13ZWJraXQtc2Nyb2xsYmFyXG57XG4gICAgd2lkdGg6IDZweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XG59XG5cbi5zdHlsZS0zOjotd2Via2l0LXNjcm9sbGJhci10aHVtYlxue1xuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbn1cblxuIl19 */"] });
    return AppComponent;
}());



/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng5_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng5-slider */ "EsRS");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _hello_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hello.component */ "1VHI");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var ngx_draggable_resize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-draggable-resize */ "fFZW");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "sCmA");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ "NGqq");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "Xlwt");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ "MSSf");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "TY1r");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/menu */ "1OTw");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/table */ "tmTa");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/toolbar */ "J0hL");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/radio */ "31NI");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/dialog */ "LcAk");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/sidenav */ "RzEb");
/* harmony import */ var _date_pipe_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./date-pipe.pipe */ "hdsS");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/select */ "2+6u");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ "A2Vd");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./about/about.component */ "84zG");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _viz_viz_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./viz/viz.component */ "w3Bs");
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./team/team.component */ "mGeP");
/* harmony import */ var _outputs_outputs_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./outputs/outputs.component */ "OWwv");
/* harmony import */ var _dialogue_dialogue_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./dialogue/dialogue.component */ "Kvm9");
/* harmony import */ var _api_api_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./api/api.component */ "zHhC");
/* harmony import */ var _pollbook_dialogue_pollbook_dialogue_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./pollbook-dialogue/pollbook-dialogue.component */ "A6hx");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/tooltip */ "gVAx");
/* harmony import */ var angular_resizable_element__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! angular-resizable-element */ "/qmH");
/* harmony import */ var ngx_walkthrough__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ngx-walkthrough */ "4zxK");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/button-toggle */ "rKiy");
/* harmony import */ var _warning_dialogue_warning_dialogue_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./warning-dialogue/warning-dialogue.component */ "bFnX");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/google-maps */ "3sZV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/core */ "fXoL");








// import { MatSliderModule } from '@angular/material/slider';

// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatTableDataSource} from '@angular/material/table';












// import { MatIconModule } from "@angular/material/icon";
















// import { DialogElementsExampleDialog } from './app.component';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_36__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_36__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
                // MatSliderModule,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_16__["MatRadioModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__["MatSidenavModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__["MatDialogModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__["MatTooltipModule"],
                ng5_slider__WEBPACK_IMPORTED_MODULE_2__["Ng5SliderModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__["MatMenuModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__["MatToolbarModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_20__["MatSelectModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_23__["AppRoutingModule"],
                ngx_draggable_resize__WEBPACK_IMPORTED_MODULE_6__["AngularDraggableModule"],
                angular_resizable_element__WEBPACK_IMPORTED_MODULE_31__["ResizableModule"],
                ngx_walkthrough__WEBPACK_IMPORTED_MODULE_32__["WalkthroughModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_33__["MatButtonToggleModule"],
                _angular_google_maps__WEBPACK_IMPORTED_MODULE_35__["GoogleMapsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_23__["AppRoutingModule"]
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_36__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _hello_component__WEBPACK_IMPORTED_MODULE_4__["HelloComponent"],
        _date_pipe_pipe__WEBPACK_IMPORTED_MODULE_19__["DatePipePipe"],
        _about_about_component__WEBPACK_IMPORTED_MODULE_22__["AboutComponent"],
        _viz_viz_component__WEBPACK_IMPORTED_MODULE_24__["VizComponent"],
        _team_team_component__WEBPACK_IMPORTED_MODULE_25__["TeamComponent"],
        _outputs_outputs_component__WEBPACK_IMPORTED_MODULE_26__["OutputsComponent"],
        _dialogue_dialogue_component__WEBPACK_IMPORTED_MODULE_27__["DialogueComponent"],
        _api_api_component__WEBPACK_IMPORTED_MODULE_28__["ApiComponent"],
        _pollbook_dialogue_pollbook_dialogue_component__WEBPACK_IMPORTED_MODULE_29__["PollbookDialogueComponent"],
        _warning_dialogue_warning_dialogue_component__WEBPACK_IMPORTED_MODULE_34__["WarningDialogueComponent"]], imports: [
        // MatSliderModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_16__["MatRadioModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__["MatSidenavModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__["MatDialogModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_30__["MatTooltipModule"],
        ng5_slider__WEBPACK_IMPORTED_MODULE_2__["Ng5SliderModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__["MatMenuModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__["MatToolbarModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_20__["MatSelectModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_23__["AppRoutingModule"],
        ngx_draggable_resize__WEBPACK_IMPORTED_MODULE_6__["AngularDraggableModule"],
        angular_resizable_element__WEBPACK_IMPORTED_MODULE_31__["ResizableModule"],
        ngx_walkthrough__WEBPACK_IMPORTED_MODULE_32__["WalkthroughModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_33__["MatButtonToggleModule"],
        _angular_google_maps__WEBPACK_IMPORTED_MODULE_35__["GoogleMapsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_23__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "bFnX":
/*!****************************************************************!*\
  !*** ./src/app/warning-dialogue/warning-dialogue.component.ts ***!
  \****************************************************************/
/*! exports provided: WarningDialogueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningDialogueComponent", function() { return WarningDialogueComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "LcAk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "Xlwt");
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';




var WarningDialogueComponent = /** @class */ (function () {
    function WarningDialogueComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    WarningDialogueComponent.prototype.ngOnInit = function () {
    };
    WarningDialogueComponent.prototype.closeAndStopUnlinking = function () {
        var obj = {
            stopUnlinking: true
        };
        this.dialogRef.close(obj);
    };
    WarningDialogueComponent.ɵfac = function WarningDialogueComponent_Factory(t) { return new (t || WarningDialogueComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])); };
    WarningDialogueComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: WarningDialogueComponent, selectors: [["app-warning-dialogue"]], decls: 7, vars: 1, consts: [["mat-button", "", "mat-dialog-close", ""], ["mat-button", "", "mat-dialog-close", "", 3, "click"]], template: function WarningDialogueComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-dialog-actions");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Close");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WarningDialogueComponent_Template_button_click_5_listener() { return ctx.closeAndStopUnlinking(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Close and stop unlinking the map!");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Your search has returned ", ctx.data.numConstituenciesInSearch, " constituencies. Showing it on the map would be rather slow so we've unlinked the map. You can turn it back on by clicking the 'link map' button.");
        } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogClose"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3YXJuaW5nLWRpYWxvZ3VlLmNvbXBvbmVudC5zY3NzIn0= */"] });
    return WarningDialogueComponent;
}());



/***/ }),

/***/ "cOn4":
/*!*************************************!*\
  !*** ./src/app/download.service.ts ***!
  \*************************************/
/*! exports provided: DownloadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadService", function() { return DownloadService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var DownloadService = /** @class */ (function () {
    function DownloadService() {
    }
    // constructor() { }
    DownloadService.prototype.downloadFile = function (data, filename) {
        if (filename === void 0) { filename = 'data'; }
        var csvData = this.ConvertToCSV(data, ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'contested', 'franchise_type', 'byelectiongeneral', 'pollbook_id']);
        // console.log(csvData)
        var blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        var dwldLink = document.createElement("a");
        var url = URL.createObjectURL(blob);
        var isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) { //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    };
    DownloadService.prototype.ConvertToCSV = function (objArray, headerList) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = 'S.No,';
        for (var index in headerList) {
            row += headerList[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = (i + 1) + '';
            for (var index in headerList) {
                var head = headerList[index];
                line += ',' + array[i][head];
            }
            str += line + '\r\n';
        }
        return str;
    };
    DownloadService.ɵfac = function DownloadService_Factory(t) { return new (t || DownloadService)(); };
    DownloadService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DownloadService, factory: DownloadService.ɵfac, providedIn: 'root' });
    return DownloadService;
}());



/***/ }),

/***/ "eHe6":
/*!********************************!*\
  !*** ./src/app/hop.service.ts ***!
  \********************************/
/*! exports provided: HOPService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOPService", function() { return HOPService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



var HOPService = /** @class */ (function () {
    function HOPService(http) {
        this.http = http;
        this.dataUrl = 'https://ecppec.ncl.ac.uk/php/getHOP.php/?constituency=';
    }
    //	dataUrl='/ECPPEC/php/getHOP.php/?constituency=';
    HOPService.prototype.getData = function (constituency, year) {
        //console.log("this.dataUrl+constituency",this.dataUrl+constituency+"&year="+year);
        return this.http.get(this.dataUrl + constituency + "&year=" + year);
    };
    HOPService.ɵfac = function HOPService_Factory(t) { return new (t || HOPService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
    HOPService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HOPService, factory: HOPService.ɵfac, providedIn: 'root' });
    return HOPService;
}());



/***/ }),

/***/ "hN/g":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/es6/symbol */ "vqGA");
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/es6/object */ "99sg");
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_object__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/es6/function */ "4A4+");
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/es6/parse-int */ "oka+");
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/es6/parse-float */ "ifmr");
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/es6/number */ "Lmuc");
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/es6/math */ "CuTL");
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/es6/string */ "V5/Y");
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/es6/date */ "nx1v");
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_date__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/es6/array */ "dQfE");
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_array__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/es6/regexp */ "rfyP");
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/es6/map */ "qKs0");
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_map__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/es6/set */ "VXxg");
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_set__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var web_animations_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! web-animations-js */ "6dTf");
/* harmony import */ var web_animations_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(web_animations_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/es6/reflect */ "VbrY");
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/es7/reflect */ "FZcq");
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! zone.js/dist/zone */ "0TWp");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_16__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/













/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
 // Run `npm install --save web-animations-js`.
/** Evergreen browsers require these. **/


/** ALL Firefox browsers require the following to support `@angular/animation`. **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.


/***/ }),

/***/ "hdsS":
/*!***********************************!*\
  !*** ./src/app/date-pipe.pipe.ts ***!
  \***********************************/
/*! exports provided: DatePipePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatePipePipe", function() { return DatePipePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var DatePipePipe = /** @class */ (function () {
    function DatePipePipe() {
    }
    DatePipePipe.prototype.transform = function (items, filter) {
        // if (!items || !filter) {
        //          return items;
        //      }
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].minYear >= filter.lowValue && items[i].maxYear <= filter.highValue) {
                filtered.push(items[i]);
            }
        }
        return filtered;
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // return items.filter(item => item.name.indexOf("York") !== -1);
        // return null;
    };
    DatePipePipe.ɵfac = function DatePipePipe_Factory(t) { return new (t || DatePipePipe)(); };
    DatePipePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "datePipe", type: DatePipePipe, pure: true });
    return DatePipePipe;
}());



/***/ }),

/***/ "mGeP":
/*!****************************************!*\
  !*** ./src/app/team/team.component.ts ***!
  \****************************************/
/*! exports provided: TeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamComponent", function() { return TeamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


var _c0 = function (a0) { return { "background-image": a0 }; };
function TeamComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var member_r1 = ctx.$implicit;
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c0, ctx_r0.getUrl(member_r1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](member_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](member_r1.position);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](member_r1.about);
} }
var TeamComponent = /** @class */ (function () {
    function TeamComponent() {
    }
    TeamComponent.prototype.ngOnInit = function () {
        this.myInnerHeight = window.innerHeight;
        //	console.log("innerHeight",this.myInnerHeight);
        this.team = [
            {
                name: "Professor Matthew Grenby",
                position: "Principal Investigator",
                about: "Matthew Grenby is Professor of Eighteenth-Century Studies and Dean of Research and Innovation at Newcastle University. Following a first degree and PhD in history at the University of Edinburgh, he taught at several universities before being appointed Fulbright-Robertson Professor of British History at Westminster College in Fulton, Missouri. In 1999, he returned to the UK to work in departments of English, first at De Montfort University, and from 2005 at Newcastle. His research has been on British cultural history in the long eighteenth century, with a focus on political fiction and children’s literature and culture.",
                link: "https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
                image: "matthew.jpg"
            },
            {
                name: "Professor Elaine Chalus",
                position: "Co Investigator",
                about: "Originally trained as a teacher in Canada, I taught for ten years in northern Alberta before returning to university and pursuing postgraduate studies in History as a mature student. I completed my MA at the University of Alberta moved to Oxford (courtesy of receiving a Social Sciences and Humanities Research Council Doctoral Fellowship Award), where I was fortunate to complete my DPhil under the late Professor Paul Langford. I joined the Department of History at the University of Liverpool in May 2016 from Bath Spa University.",
                link: "https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
                image: "elaine.jpg"
            },
            {
                name: "Dr Kendra Packham",
                position: "Research Associate",
                about: "Kendra is a Research Associate at Newcastle University. She specializes in the ​relations between literary representations—including plays, ballads, and novels—and electoral culture. She was awarded her doctorate by the University of Oxford, and has taught and held Fellowships at the universities of Oxford and Cambridge; she has also held Visiting Fellowships at the Lewis Walpole Library, Yale University, and the Folger Shakespeare Library, Washington, D.C. For the ECPPEC project, she’s particularly focusing on recovering and analysing electoral culture, and the links between different electoral interventions and electoral behaviour and political participation.",
                link: "https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
                image: "kendra.jpg"
            },
            {
                name: "Dr James Harris",
                position: "Research Associate",
                about: "James joined Newcastle University as a Research Associate in February 2020, having completed his doctorate at the University of Oxford. He leads on the collection and analysis of polling data for the ECPPEC project, whilst conducting broader research into election practices and political participation. His wider research interests include regional history (particularly Cornwall and Wales), antiquarianism, and the development of Anglicanism.",
                link: "https://www.ncl.ac.uk/elll/staff/profile/jamesharris.html#background",
                image: "james.jpg"
            },
            {
                name: "Dr Tom Schofield",
                position: "Co Investigator",
                about: "My work with archives and cultural data engages practically with issues of digital culture through creative art and design practice. As heritage is increasingly experienced through digital means, issues of objecthood become sites for potential scholarly and creative intervention. I use art and design methods to help us think about the value of cultural heritage, bring it to new publics and rethink scholarly approaches to it.",
                link: "https://www.liverpool.ac.uk/history/staff/elaine-chalus/",
                image: "tom.jpg"
            },
            {
                name: "Dr John Shoneboom",
                position: "Research Software Developer",
                about: "John is a Research Software Developer with a longstanding focus on making complex data sets useful to a stakeholder community that ranges from lay people to experts. He is also a novelist and playwright with a PhD in Creative Writing, an MA in Science, Technology, and International Affairs, and a BA in Political Science. When he’s not writing code and taming databases, his practice-led research interest is in developing a surrealist mode of inquiry for interrogating (inter alia) the national security state.",
                link: "https://www.ncl.ac.uk/sacs/staff/",
                image: "john.jpg"
            },
            {
                name: "Dan Foster Smith",
                position: "Research Software Developer",
                about: "Dan joined the ECPPEC project as a Research Software Developer in January 2021. He has a background in Graphic Design, Software Development and Data visualisation. He has previously worked as a Research Associate Newcastle University on a number of Cultural Heritage Projects and is also currently studding a PhD in AI and Design. For the ECPPEC project, he’s jointly focusing on the development of the API and online visualisation of the polling data and the surrounding electoral cultural.",
                link: "https://www.ncl.ac.uk/sacs/staff/profile/danielfoster-smith.html",
                image: "dan.jpg"
            }
        ];
    };
    TeamComponent.prototype.onResize = function (event) {
        // event.target.innerWidth;
        this.myInnerHeight = event.target.innerHeight;
    };
    TeamComponent.prototype.getUrl = function (member) {
        //console.log("url('./assets/images/team/"+member.image+"')");
        return "url('./assets/images/team/" + member.image + "')";
    };
    TeamComponent.ɵfac = function TeamComponent_Factory(t) { return new (t || TeamComponent)(); };
    TeamComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TeamComponent, selectors: [["app-team"]], hostBindings: function TeamComponent_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function TeamComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
        } }, decls: 2, vars: 3, consts: [["id", "container"], ["id", "style-3", "style", "background-size: cover; background-repeat: no-repeat;", "class", "team_member", 3, "ngStyle", 4, "ngFor", "ngForOf"], ["id", "style-3", 1, "team_member", 2, "background-size", "cover", "background-repeat", "no-repeat", 3, "ngStyle"], [2, "font-family", "Catamaran"], ["id", "spacer"], [1, "about_section"], [2, "height", "100%", "overflow", "hidden"]], template: function TeamComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TeamComponent_div_1_Template, 9, 6, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("height", ctx.myInnerHeight, "px");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.team);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]], styles: ["#container[_ngcontent-%COMP%] {\n  padding: 5%;\n  background-color: black;\n  position: relative;\n}\n\n.team_member[_ngcontent-%COMP%] {\n  width: 15% !important;\n  min-width: 250px;\n  height: 40%;\n  \n  margin-bottom: 2% !important;\n  margin-left: 2% !important;\n  margin-right: 2% !important;\n  border-color: black;\n  \n  \n  border-radius: 10px 0px 0px 0px;\n  background-color: lightGrey;\n  padding: 2%;\n  display: inline-block !important;\n  overflow: scroll;\n  overflow-x: hidden;\n  \n}\n\n#spacer[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40%;\n}\n\np[_ngcontent-%COMP%] {\n  color: white;\n}\n\nh1[_ngcontent-%COMP%] {\n  color: #ffd740;\n  font-family: Roboto;\n  vertical-align: top;\n  line-height: 90%;\n  position: relative;\n  top: -10%;\n}\n\nh2[_ngcontent-%COMP%] {\n  font-family: Roboto;\n  color: lightGrey;\n}\n\n#style-3[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.63);\n  background-color: orange;\n}\n\n#style-3[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  background-color: orange;\n}\n\n#style-3[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: orange;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RlYW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxXQUFBO0VBQ0EsdUJBQUE7RUFFQSxrQkFBQTtBQUFEOztBQUdBO0VBQ0MscUJBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EsMEJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsK0JBQUE7RUFDQSwyQkFBQTtFQUNBLFdBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQTs7cUJBQUE7QUFFRDs7QUFNQTtFQUNDLFdBQUE7RUFDQSxXQUFBO0FBSEQ7O0FBS0E7RUFDQyxZQUFBO0FBRkQ7O0FBSUE7RUFDQyxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FBREQ7O0FBR0E7RUFDQyxtQkFBQTtFQUNBLGdCQUFBO0FBQUQ7O0FBR0E7RUFFSSxxREFBQTtFQUNBLHdCQUFBO0FBREo7O0FBSUE7RUFFSSxVQUFBO0VBQ0Esd0JBQUE7QUFGSjs7QUFLQTtFQUVJLHdCQUFBO0FBSEo7O0FBS0EsR0FBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSIsImZpbGUiOiJ0ZWFtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lcntcblx0cGFkZGluZzo1JTtcblx0YmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG5cblx0cG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udGVhbV9tZW1iZXJ7XG5cdHdpZHRoOjE1JSAhaW1wb3J0YW50O1xuXHRtaW4td2lkdGg6IDI1MHB4O1xuXHRoZWlnaHQ6IDQwJTtcblx0LypoZWlnaHQ6NDAlICFpbXBvcnRhbnQ7Ki9cblx0bWFyZ2luLWJvdHRvbTogMiUgIWltcG9ydGFudDtcblx0bWFyZ2luLWxlZnQ6IDIlICFpbXBvcnRhbnQ7XG5cdG1hcmdpbi1yaWdodDogMiUgIWltcG9ydGFudDtcblx0Ym9yZGVyLWNvbG9yOiBibGFjaztcblx0Lypib3JkZXI6MTBweCBzb2xpZDsqL1xuXHQvKm1hcmdpbjo1JTsqL1xuXHRib3JkZXItcmFkaXVzOiAxMHB4IDBweCAwcHggMHB4O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodEdyZXk7XG5cdHBhZGRpbmc6MiU7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xuXHRvdmVyZmxvdzogc2Nyb2xsO1xuXHRvdmVyZmxvdy14OmhpZGRlbjtcblx0Lypcblx0b3ZlcmZsb3cteDpoaWRkZW47XG5cdG92ZXJmbG93LXk6aGlkZGVuOyovXG5cdFxuXHRcbn1cbi5hYm91dF9zZWN0aW9ue1xufVxuI3NwYWNlcntcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDo0MCU7XG59XG5we1xuXHRjb2xvcjogd2hpdGU7XG59XG5oMXtcblx0Y29sb3I6ICNmZmQ3NDA7XG5cdGZvbnQtZmFtaWx5OiBSb2JvdG87XG5cdHZlcnRpY2FsLWFsaWduOiB0b3A7XG5cdGxpbmUtaGVpZ2h0OiA5MCU7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0dG9wOi0xMCU7XG59XG5oMntcblx0Zm9udC1mYW1pbHk6IFJvYm90bztcblx0Y29sb3I6IGxpZ2h0R3JleTtcbn1cblxuI3N0eWxlLTM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrXG57XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsMC42Myk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuXG4jc3R5bGUtMzo6LXdlYmtpdC1zY3JvbGxiYXJcbntcbiAgICB3aWR0aDogNnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbn1cblxuI3N0eWxlLTM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iXG57XG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuLyoqL1xuLyojdGVhbV9tZW1iZXJ7XG5cdHdpZHRoOjMwJTtcblx0bWFyZ2luOjUlO1xuXHRib3JkZXItcmFkaXVzOiAxJTtcblx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRHcmV5O1xufVxuI3RlYW1fY29udGFpbmVye1xuXG5cdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG5cdGJvcmRlcjogMjBweCBzb2xpZDtcblxuXHQgcGFkZGluZy1sZWZ0OjMwcHg7XG4gIHBhZGRpbmctcmlnaHQ6MzBweDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDIwMCU7XG59XG5cblxuaDF7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOjEwcHg7XG4gIHBhZGRpbmc6MiU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC41KTtcbiAgY29sb3I6d2hpdGU7XG4gIHotaW5kZXg6IDEwO1xuICBmb250LWZhbWlseTogJ0NhYmluJywgc2Fucy1zZXJpZjtcbn1cblxuLm1hcC1jb250YWluZXJ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBsZWZ0OiAwO1xuICBib3JkZXItY29sb3I6cmVkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcblxufSovIl19 */"] });
    return TeamComponent;
}());



/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about/about.component */ "84zG");
/* harmony import */ var _viz_viz_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viz/viz.component */ "w3Bs");
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./team/team.component */ "mGeP");
/* harmony import */ var _outputs_outputs_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./outputs/outputs.component */ "OWwv");
/* harmony import */ var _api_api_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api/api.component */ "zHhC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








var routes = [
    { path: '', redirectTo: '/viz', pathMatch: 'full' },
    { path: 'about', component: _about_about_component__WEBPACK_IMPORTED_MODULE_1__["AboutComponent"] },
    { path: 'viz', component: _viz_viz_component__WEBPACK_IMPORTED_MODULE_2__["VizComponent"] },
    { path: 'team', component: _team_team_component__WEBPACK_IMPORTED_MODULE_3__["TeamComponent"] },
    { path: 'api', component: _api_api_component__WEBPACK_IMPORTED_MODULE_5__["ApiComponent"] },
    { path: 'outputs', component: _outputs_outputs_component__WEBPACK_IMPORTED_MODULE_4__["OutputsComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
    return AppRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "w3Bs":
/*!**************************************!*\
  !*** ./src/app/viz/viz.component.ts ***!
  \**************************************/
/*! exports provided: VizComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VizComponent", function() { return VizComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/google-maps */ "3sZV");
/* harmony import */ var _geojson_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geojson-service.service */ "I5uy");
/* harmony import */ var _get_elections_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../get-elections.service */ "RFKS");
/* harmony import */ var _borough_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../borough.service */ "OdKX");
/* harmony import */ var _centroids_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../centroids.service */ "Q1M9");
/* harmony import */ var _get_poll_books_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../get-poll-books.service */ "C8p3");
/* harmony import */ var _hop_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hop.service */ "eHe6");
/* harmony import */ var _download_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../download.service */ "cOn4");
/* harmony import */ var _download_poll_books_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../download-poll-books.service */ "+5AN");
/* harmony import */ var _get_lat_lon_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../get-lat-lon.service */ "8TUE");
/* harmony import */ var ng5_slider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng5-slider */ "EsRS");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/add/operator/map */ "4XzM");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/paginator */ "sCmA");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/table */ "tmTa");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/dialog */ "LcAk");
/* harmony import */ var _pollbook_dialogue_pollbook_dialogue_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../pollbook-dialogue/pollbook-dialogue.component */ "A6hx");
/* harmony import */ var _dialogue_dialogue_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../dialogue/dialogue.component */ "Kvm9");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var angular_resizable_element__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! angular-resizable-element */ "/qmH");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/button */ "Xlwt");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/icon */ "TY1r");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/tooltip */ "gVAx");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/form-field */ "IRfi");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/input */ "A2Vd");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/select */ "2+6u");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/core */ "j14s");















































var _c0 = function (a0, a1) { return { icon: a0, title: a1 }; };
function VizComponent_map_marker_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "map-marker", 16);
} if (rf & 2) {
    var dynamicMarker_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("position", dynamicMarker_r7.getPosition())("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, dynamicMarker_r7.getIcon(), dynamicMarker_r7.title));
} }
function VizComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " elections of which ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "strong", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.dataSource.filteredData.length, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.getNumberOfContested());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.getPlural(ctx_r1.getNumberOfContested()));
} }
function VizComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 20);
} if (rf & 2) {
    var bar_r8 = ctx.$implicit;
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("matTooltip", "", bar_r8.year, ": ", bar_r8.numElections, " elections");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx_r3.getBarStyle(bar_r8, _r2.offsetWidth, _r2.offsetHeight, false));
} }
function VizComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 21);
} if (rf & 2) {
    var bar_r9 = ctx.$implicit;
    var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("matTooltip", "", bar_r9.year, ": ", bar_r9.numContested, " contested elections");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx_r4.getBarStyle(bar_r9, _r2.offsetWidth, _r2.offsetHeight, true));
} }
function VizComponent_table_21_th_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Constituency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r10.constituencyFilter);
} }
function VizComponent_table_21_td_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r30.constituency, " ");
} }
function VizComponent_table_21_th_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Month ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r12.monthFilter);
} }
function VizComponent_table_21_td_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r31.election_month, " ");
} }
function VizComponent_table_21_th_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Year ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r14.yearFilter);
} }
function VizComponent_table_21_td_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r32.election_year, " ");
} }
function VizComponent_table_21_th_11_Template(rf, ctx) { if (rf & 1) {
    var _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "County/Borough/Univ ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-select", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function VizComponent_table_21_th_11_Template_mat_select_valueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r34); var ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r33.countyFilter.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Any");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "C");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "B");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-option", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "U");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r16.countyFilter)("value", ctx_r16.countyFilter.value);
} }
function VizComponent_table_21_td_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r35 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r35.countyboroughuniv, " ");
} }
function VizComponent_table_21_th_14_Template(rf, ctx) { if (rf & 1) {
    var _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Contested?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-select", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function VizComponent_table_21_th_14_Template_mat_select_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r37); var ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r36.contestedFilter.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Any");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-option", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-option", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r18.contestedFilter)("value", ctx_r18.contestedFilter.value);
} }
function VizComponent_table_21_td_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r38.contested, " ");
} }
function VizComponent_table_21_th_17_Template(rf, ctx) { if (rf & 1) {
    var _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "By/General Election ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-select", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function VizComponent_table_21_th_17_Template_mat_select_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r40); var ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r39.byElectionGeneralFilter.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Any");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "By Election");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-option", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "General Election");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r20.byElectionGeneralFilter)("value", ctx_r20.byElectionGeneralFilter.value);
} }
function VizComponent_table_21_td_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r41 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r41.by_election_general, " ");
} }
function VizComponent_table_21_th_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "By Election Cause ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r22.byElectionCauseFilter);
} }
function VizComponent_table_21_td_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r42.by_election_cause, " ");
} }
function VizComponent_table_21_th_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Franchise ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r24.franchiseFilter);
} }
function VizComponent_table_21_td_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r43.franchise_type, " ");
} }
function VizComponent_table_21_th_26_Template(rf, ctx) { if (rf & 1) {
    var _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Has Poll Books? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-select", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function VizComponent_table_21_th_26_Template_mat_select_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); var ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r44.pollBookCodeFilter.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Any");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-option", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Yes");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-option", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r26.pollBookCodeFilter)("value", ctx_r26.pollBookCodeFilter.value);
} }
function VizComponent_table_21_td_27_Template(rf, ctx) { if (rf & 1) {
    var _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VizComponent_table_21_td_27_Template_td_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r48); var element_r46 = ctx.$implicit; var ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r47.getBook($event, element_r46); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var element_r46 = ctx.$implicit;
    var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r27.getHasPollBooks(element_r46.pollbook_id), "");
} }
function VizComponent_table_21_tr_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 57);
} }
function VizComponent_table_21_tr_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 58);
} }
function VizComponent_table_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](1, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, VizComponent_table_21_th_2_Template, 6, 2, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, VizComponent_table_21_td_3_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, VizComponent_table_21_th_5_Template, 6, 2, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, VizComponent_table_21_td_6_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](7, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, VizComponent_table_21_th_8_Template, 6, 2, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, VizComponent_table_21_td_9_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](10, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, VizComponent_table_21_th_11_Template, 13, 3, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, VizComponent_table_21_td_12_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](13, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, VizComponent_table_21_th_14_Template, 12, 3, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, VizComponent_table_21_td_15_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](16, 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, VizComponent_table_21_th_17_Template, 12, 3, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, VizComponent_table_21_td_18_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](19, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, VizComponent_table_21_th_20_Template, 6, 2, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, VizComponent_table_21_td_21_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](22, 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, VizComponent_table_21_th_23_Template, 6, 2, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, VizComponent_table_21_td_24_Template, 2, 1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](25, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, VizComponent_table_21_th_26_Template, 12, 3, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, VizComponent_table_21_td_27_Template, 2, 1, "td", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, VizComponent_table_21_tr_28_Template, 1, 0, "tr", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, VizComponent_table_21_tr_29_Template, 1, 0, "tr", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx_r5.dataSource);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx_r5.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx_r5.displayedColumns);
} }
function VizComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", ctx_r6.HOPtext.date_range, " ", ctx_r6.HOPtext.innerText, " ");
} }
var _c1 = function () { return { bottom: false, right: false, top: false, left: true }; };
var _c2 = function () { return [5, 10, 20, 50, 100, 500]; };
var VizComponent = /** @class */ (function () {
    function VizComponent(dialog, _differs, appRef, centroidsService, boroughService, http, hOPService, downloadPollBooksService, downloadService, getElectionsService, geojsonServiceService, getPollBooksService, getLatLonService) {
        this.dialog = dialog;
        this._differs = _differs;
        this.appRef = appRef;
        this.centroidsService = centroidsService;
        this.boroughService = boroughService;
        this.http = http;
        this.hOPService = hOPService;
        this.downloadPollBooksService = downloadPollBooksService;
        this.downloadService = downloadService;
        this.getElectionsService = getElectionsService;
        this.geojsonServiceService = geojsonServiceService;
        this.getPollBooksService = getPollBooksService;
        this.getLatLonService = getLatLonService;
        this.uniqueElections = [];
        this.style = {};
        this.gotPollBooks = false;
        //debouncer for the datalayer click
        this.clicked = false;
        this.zoom = 7;
        this.mapIsReady = false;
        this.options = {
            mapTypeId: 'hybrid',
            maxZoom: 10,
            minZoom: 2,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#999999"
                        }
                    ]
                },
                {
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#212121"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#181818"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1b1b1b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#2c2c2c"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8a8a8a"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#373737"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3c3c3c"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#4e4e4e"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3d3d3d"
                        }
                    ]
                }
            ]
        };
        this.center = {
            lat: 52.4862,
            lng: 1.8904
        };
        this.HOPtext = "";
        this.animating = false;
        this.constituencyNames = [];
        this.dynamicMarkers = [];
        this.forceLink = false;
        //the main filters for the table/database
        this.filteredValues = {
            election_month: '', constituency: '', election_year: '', countyboroughuniv: '', contested: '', by_election_general: '', by_election_cause: '', franchise_type: '', pollbook_id: ''
        };
        //for the graph
        this.electionsPerYear = [];
        this.constituencyFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.monthFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.yearFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.countyFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.contestedFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.byElectionGeneralFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.byElectionCauseFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.franchiseFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.pollBookCodeFilter = new _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControl"]();
        this.globalFilter = '';
        this.displayedColumns = ['constituency', 'election_year', 'election_month', 'countyboroughuniv', 'by_election_general', 'by_election_cause', 'franchise_type', 'contested', 'pollbook_id'];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatTableDataSource"]();
        //for the timelines
        this.minYear = 1695;
        this.maxYear = 1832;
        this.sliderOptions = {
            floor: 1695,
            ceil: 1832
        };
        //generic mapping funciton
        this.mapRange = function (num, in_min, in_max, out_min, out_max) {
            return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        };
        this._differ = _differs.find({}).create();
    }
    //this is a big inefficient watcher on the dataSource
    VizComponent.prototype.ngDoCheck = function () {
        // var datObj = {};
        // if (this.dataSource.filter.length > 0) {
        // 	datObj = JSON.parse(this.dataSource.filter);
        // }
        // const change = this._differ.diff(datObj);
        // if (change) {
        // 	this.electionsPerYear = this.getElectionsPerYear();
        // 	this.updateIsActive(this.getFilteredConstituencies());
        // 	this.setMapStyle();
        // 	this.dynamicMarkers.forEach(delement => {
        // 		var inData =false;
        // 		var cbu = "";
        // 	this.dataSource.filteredData.forEach(felement => {
        // 		if(delement.getTitle().trim()==felement.constituency.trim()){
        // 			inData = true;
        // 			cbu = felement.countyboroughuniv;
        // 		}
        // 	});
        // 	if(inData){
        // 		var image = {
        // 			url: './assets/images/smarker.svg',
        // 			size: new google.maps.Size(71, 71),
        // 			origin: new google.maps.Point(0, 0),
        // 			anchor: new google.maps.Point(17, 34),
        // 			scaledSize: new google.maps.Size(25, 25)
        // 		  };
        // 		  var options = {
        // 			icon:image,
        // 			title:	delement.getTitle(),
        // 			visible:cbu=="C" ? false : true,
        // 			label:  {text: delement.getTitle() , color: "white"}
        // 		}
        // 	 delement.setOptions(options);
        // 	}else{
        // 		var image = {
        // 			url: './assets/images/dot.svg',
        // 			size: new google.maps.Size(20, 20),
        // 			origin: new google.maps.Point(0, 0),
        // 			anchor: new google.maps.Point(10, 10),
        // 			scaledSize: new google.maps.Size(20, 20)
        // 		  };
        // 		  var options = {
        // 			icon:image,
        // 			title:delement.getTitle(),
        // 			visible:cbu=="C" ? false : true,
        // 			label:  {text: delement.getTitle() , color: "white"}
        // 		}
        // 	 delement.setOptions(options);
        // 	}
        // });
        // }
    };
    VizComponent.prototype.ngOnDestroy = function () {
    };
    VizComponent.prototype.ngOnInit = function () {
        this.dynamicMarker = new google.maps.Marker();
        this.dynamicMarker.setPosition({ lat: 51, lng: 0 });
        var image = {
            url: './assets/images/bmarker.svg',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        var options = {
            icon: image,
            title: "test",
            visible: true,
            label: { text: "test", color: "white" }
        };
        this.dynamicMarker.setOptions(options);
        for (var i = this.minYear; i <= this.maxYear; i++) {
            var obj = {
                year: i,
                numElections: 0,
                numContested: 0
            };
            this.electionsPerYear.push(obj);
        }
        //main function containing callbacks from the API
        this.getData();
        //tedious material stuff to add pagination to the table
        this.dataSource.paginator = this.paginator;
        // when we land, open the initial modal with the search options in it
        this.hopData = {
            innerText: "",
            yearRange: "",
            url: "",
            constituency: "",
            fetch: true
        };
    };
    ///////////////////////////////////**** START DATA SUBSCRIPTIONS****///////////////////////////////////
    VizComponent.prototype.getBook = function ($event, element) {
        var _this = this;
        var splitCodes = element.pollbook_id.split(";");
        var trimmedCodes = "";
        for (var i = 0; i < splitCodes.length; i++) {
            trimmedCodes += splitCodes[i].trim() + ";";
        }
        trimmedCodes = trimmedCodes.substring(0, trimmedCodes.length - 1);
        this.getPollBooksService.getData(trimmedCodes)
            .subscribe(function (data) { return _this.pollBooks = {
            num_results: data['num_results'],
            poll_books: data['poll_books'],
        }; }, function (err) { return console.error(err); }, function () { return _this.openPollBookDialog(); });
    };
    //main data grabbign  function called in ngonint 
    VizComponent.prototype.getData = function () {
        var _this = this;
        this.getElectionsService.getData()
            .subscribe(function (data) { return _this.electionsMeta = {
            num_results: data['num_results'],
            earliest_year: data['earliest_year'],
            latest_year: data['latest_year'],
            elections: data['elections']
        }; }, function (err) { return console.error(err); }, function () { return _this.setUpFilters(); });
    };
    ;
    ///////////////////////////////////**** END DATA SUBSCRIPTIONS****///////////////////////////////////
    ///////////////////////////////////****START RESIZE FUNCTIONS****///////////////////////////////////
    //the database table is draggable
    VizComponent.prototype.onResizeEnd = function (event) {
        console.log('Element was resized', event);
        this.style = {
            position: 'fixed',
            right: "3%",
            width: event.rectangle.width + "px",
        };
    };
    VizComponent.prototype.onResizeStart = function (event) {
        console.log('Element was resized start', event);
    };
    ///////////////////////////////////****END RESIZE FUNCTIONS****///////////////////////////////////
    ///////////////////////////////////****START GRAPH FUNCTIONS****///////////////////////////////////
    VizComponent.prototype.getNumberOfContested = function () {
        var count = 0;
        for (var i = 0; i < this.dataSource.filteredData.length; i++) {
            if (this.dataSource.filteredData[i].contested.trim().toLowerCase().indexOf("y") > -1)
                count++;
        }
        return count;
    };
    //this is used to calibrate the bar heigh on the graph
    VizComponent.prototype.getMaxMinElectionsPerYear = function () {
        var max = 0;
        var min = 10000000;
        for (var i = 0; i < this.electionsPerYear.length; i++) {
            if (this.electionsPerYear[i]['numElections'] > max)
                max = this.electionsPerYear[i]['numElections'];
            if (this.electionsPerYear[i]['numElections'] < min)
                min = this.electionsPerYear[i]['numElections'];
        }
        return { max: max, min: min };
    };
    VizComponent.prototype.getHeight = function (bar) {
        return bar.numElections;
    };
    //is called as a [ngStyle]= in the html for the graph
    VizComponent.prototype.getBarStyle = function (bar, divWidth, divHeight, contested) {
        var maxMin = this.getMaxMinElectionsPerYear();
        var yearRange = this.maxYear - this.minYear + 1;
        //var barWidth = divWidth / yearRange;
        var barWidth = divWidth / 137;
        var left = bar.year - 1695;
        left *= barWidth;
        var leftStr = left.toString();
        leftStr += "px";
        var barHeight = 0;
        var col;
        if (contested) {
            barHeight = this.mapRange(bar.numContested, maxMin.min, maxMin.max, 0, divHeight);
        }
        else {
            barHeight = this.mapRange(bar.numElections, maxMin.min, maxMin.max, 0, divHeight);
        }
        return {
            width: barWidth + "px",
            // bottom:"0px",
            height: barHeight + "px",
            left: leftStr
        };
    };
    VizComponent.prototype.getElectionsPerYear = function () {
        this.electionsPerYear.forEach(function (element) {
            element.numElections = 0;
            element.numContested = 0;
        });
        for (var i = 0; i < this.dataSource.filteredData.length; i++) {
            var index = parseInt(this.dataSource.filteredData[i]['election_year']) - 1695;
            if (index >= 0 && index < this.electionsPerYear.length) {
                this.electionsPerYear[index]['numElections']++;
                if (this.dataSource.filteredData[i]['contested'] == 'Y') {
                    this.electionsPerYear[index]['numContested']++;
                }
            }
        }
        return this.electionsPerYear;
    };
    //just for neatness in the text of the graph
    VizComponent.prototype.getPlural = function (number) {
        if (number == 1) {
            return " was contested.";
        }
        return " were contested.";
    };
    ///////////////////////////////////****END GRAPH FUNCTIONS****///////////////////////////////////
    ///////////////////////////////////****START LISTENER FUNCTIONS****///////////////////////////////////
    VizComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    VizComponent.prototype.onValueChange = function (changeContext) {
        console.log(changeContext);
    };
    VizComponent.prototype.sliderChange = function (changeContext) {
        this.minYear = changeContext.value;
        this.maxYear = changeContext.highValue;
        this.yearFilter.setValue(changeContext.value.toString() + "-" + changeContext.highValue.toString());
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    };
    ///////////////////////////////////****END LISTENER FUNCTIONS****///////////////////////////////////
    /////////////////////////////////////////*********START MAP UPDATE FUNCTIONS***********/////////////////////////////////////////
    VizComponent.prototype.setUpMapData = function () {
        var _this = this;
        this.map.data.loadGeoJson("https://ecppec.ncl.ac.uk/assets/data/england.json");
        this.map.data.setStyle(function (feature) {
            var color = "white";
            return {
                fillColor: "pink",
                strokeColor: "white",
                strokeWeight: 1,
                zIndex: 0,
            };
        });
        //TODO where's DURHAM?
        this.map.data.addListener('mouseover', function (event) {
            _this.setMatchingCountyMarkerVisibility(true, event.feature.getProperty("name"));
        });
        this.map.data.addListener('mouseout', function (event) {
            _this.setMatchingCountyMarkerVisibility(false, event.feature.getProperty("name"));
        });
        this.map.data.addListener('click', function (event) {
            console.log("click");
            if (!_this.clicked) {
                _this.clicked = true;
                if (event.feature.getProperty('isActive')) {
                    event.feature.setProperty('isActive', false);
                    var updatedConstituencyFilterValue = _this.filteredValues['constituency'].replace(',' + event.feature.getProperty("name"), '');
                    _this.constituencyFilter.setValue(updatedConstituencyFilterValue);
                    _this.filteredValues['constituency'] = updatedConstituencyFilterValue;
                    _this.dataSource.filter = JSON.stringify(_this.filteredValues);
                }
                else {
                    event.feature.setProperty('isActive', true);
                    _this.filteredValues['constituency'] = _this.filteredValues['constituency'] + "," + event.feature.getProperty("name");
                    _this.constituencyFilter.setValue(_this.filteredValues['constituency']);
                    _this.dataSource.filter = JSON.stringify(_this.filteredValues);
                }
                _this.appRef.tick();
                setTimeout(function () {
                    _this.clicked = false;
                }, 500);
            }
        });
        this.setMapStyle();
    };
    VizComponent.prototype.mapReady = function () {
        if (!this.mapIsReady) {
            console.log("map ready");
            this.setUpMapData();
        }
    };
    VizComponent.prototype.setMapStyle = function () {
        this.map.data.setStyle(function (feature) {
            var name = feature.getProperty('isActive');
            var color = "white";
            var index = 1;
            if (name) {
                color = "#0db9f0";
                index = 2;
            }
            else {
                color = "white";
                index = 1;
            }
            ;
            return {
                strokeColor: color,
                strokeWeight: index,
                zIndex: index,
                fillColor: "grey"
            };
        });
    };
    VizComponent.prototype.setallInActive = function () {
        this.map.data.forEach(function (feature) {
            feature.setProperty("isActive", false);
        });
    };
    VizComponent.prototype.updateIsActive = function (constituencies) {
        this.map.data.forEach(function (feature) {
            var name = feature.getProperty('name');
            if (constituencies.indexOf(name) > -1) {
                feature.setProperty("isActive", true);
            }
            else {
                feature.setProperty("isActive", false);
            }
        });
    };
    VizComponent.prototype.updateMapStyles = function (constituencies) {
        this.map.data.setStyle(function (feature) {
            var name = feature.getProperty('name');
            var color = "white";
            var index = 1;
            if (constituencies.indexOf(name) > -1) {
                color = "#0db9f0";
                index = 3;
            }
            else {
                color = "white";
                index = 1;
            }
            ;
            return {
                strokeColor: color,
                strokeWeight: index,
                zIndex: index
            };
        });
    };
    VizComponent.prototype.mapZoomChanged = function () {
    };
    //TODO What is the actual call back for the data
    VizComponent.prototype.mapIdle = function () {
        var featureCount = 0;
        this.map.data.forEach(function (feature) {
            featureCount++;
        });
        if (featureCount > 1 && this.mapIsReady == false) {
            this.setallInActive();
            this.mapIsReady = true;
        }
    };
    //return the markers included from the current list of filtered table data
    //this is the really problematic bit that causes the biggest data delay. 
    VizComponent.prototype.updateDataLayerStyles = function () {
        //a simple list of current constituenciy names
        var filteredConstituencies = this.getFilteredConstituencies();
    };
    VizComponent.prototype.clearMap = function () {
        // this.displayedMarkers = this.markers.filter(marker => this.getFilteredConstituencies().includes("gobbldeygook"));
    };
    /////////////////////////////////////////*********END MAP UPDATE FUNCTIONS***********/////////////////////////////////////////
    /////////////////////////////////////////*********START UTILITY FUNCTIONS***********/////////////////////////////////////////
    VizComponent.prototype.setMatchingCountyMarkerVisibility = function (visible, constituency) {
        console.log("mouseover", constituency);
        var image = {
            url: './assets/images/dot.svg',
            size: new google.maps.Size(20, 20),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(20, 20)
        };
        var options = {
            icon: image,
            title: constituency,
            visible: visible,
            label: { text: constituency, color: "white" }
        };
        this.dynamicMarkers.forEach(function (element) {
            if (element.getTitle() == constituency) {
                //	console.log("setting ",constituency, " to ", visible);
                element.setOptions(options);
            }
        });
        this.appRef.tick();
    };
    VizComponent.prototype.getUniqueElections = function () {
        // 	var constituencies = [];
        // 	if(this.uniqueElections!=undefined){
        // 	this.dataSource.data.forEach(element => {
        // 		if(constituencies.indexOf(element.constituency)==-1){
        // 		//	console.log("adding ",element)
        // 		constituencies.push(element.constituency);
        // 		this.uniqueElections.push(element);
        // 		}
        // 	});
        // }
        this.uniqueElections = this.dataSource.data.filter(function (value, index, self) { return self.map(function (x) { return x.constituency; }).indexOf(value.constituency) == index; });
        //console.log("this.uniqueElections",this.uniqueElections);
        //this.uniqueElections = this.dataSource.filteredData.map(item => item.constituency).filter((value, index, self) => self.indexOf(value) === index);
    };
    VizComponent.prototype.getPosition = function (marker) {
        return { lat: 51.0, lng: 1.8 };
    };
    VizComponent.prototype.arrayRemove = function (arr, value) { return arr.filter(function (ele) { return ele != value; }); };
    VizComponent.prototype.getHasPollBooks = function (pollbook_id) {
        if (pollbook_id.length > 0)
            return 'Y (' + pollbook_id.split(";").length + ')';
        return 'N';
    };
    //what it sounds like - jsut called at the beginning to get some nice looking data
    VizComponent.prototype.generateRandomSearch = function () {
        var spread = Math.floor(Math.random() * 8) + 2;
        var fullRange = 1832 - (1695 + spread);
        var start = Math.floor(Math.random() * fullRange) + 1696;
        this.minYear = start;
        this.maxYear = spread + start;
        console.log("years", this.minYear, this.maxYear);
        var y = 1777;
        //TODO add some other filters here like by election cause
        this.yearFilter.setValue(this.minYear.toString() + "-" + this.maxYear.toString());
        this.constituencyFilter.setValue(this.getRandomConstituenciesString(20));
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    };
    VizComponent.prototype.getRandomConstituenciesString = function (numRandomConsituencies) {
        var filteredConstituencies = [];
        for (var i = 0; i < this.dataSource.filteredData.length; i++) {
            if (!filteredConstituencies.includes(this.dataSource.filteredData[i].constituency)) {
                filteredConstituencies.push(this.dataSource.filteredData[i].constituency);
            }
        }
        var indices = [];
        var randomConsituencies = "";
        var isFirst = true;
        for (var i = 0; i < numRandomConsituencies; i++) {
            var randomIndex = Math.floor(Math.random() * filteredConstituencies.length - 1);
            // if(!in_array())
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
                if (isFirst) {
                    randomConsituencies = filteredConstituencies[randomIndex];
                    isFirst = false;
                }
                else {
                    randomConsituencies += "," + filteredConstituencies[randomIndex];
                }
            }
        }
        return randomConsituencies;
    };
    /////////////////////////////////////////*********END UTILITY FUNCTIONS***********/////////////////////////////////////////
    /////////////////////////////////////////*********START BUTTONS AND SLIDERS FUNCTIONS***********/////////////////////////////////////////
    VizComponent.prototype.animateTimeLine = function () {
        var _this = this;
        if (this.animating) {
            if (this.animatingId) {
                clearInterval(this.animatingId);
            }
        }
        else {
            this.animatingId = setInterval(function () {
                _this.minYear++;
                _this.maxYear++;
                _this.yearFilter.setValue(_this.minYear.toString() + "-" + _this.maxYear.toString());
                _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            }, 300);
        }
        this.animating = !this.animating;
    };
    //downlaod the elections data
    VizComponent.prototype.download = function () {
        this.downloadService.downloadFile(this.dataSource.filteredData, 'elections');
    };
    //downlaod pollbook data
    VizComponent.prototype.downloadPollBooks = function () {
        this.downloadPollBooksService.downloadFile(this.pollBooks.poll_books, 'pollBooks');
    };
    //called when the filter updates I think
    VizComponent.prototype.setDateSlider = function () {
        console.log(this.yearFilter.value);
        var years = this.yearFilter.value;
        if (years.split("-").length == 2 && years.trim().length == 9) {
            console.log("year range");
            this.minYear = years.split("-")[0].trim();
            this.maxYear = years.split("-")[1].trim();
        }
        else if (years.split(",").length > 1) {
            console.log("year list");
            // this.minYear = years.split(",")[0];
            // this.maxYear = 1832;
        }
        else if (years.length == 4) {
            console.log("single year");
            this.minYear = parseInt(years.trim());
            this.maxYear = parseInt(years.trim());
        }
        else {
            console.log("no match for year format");
            // this.minYear = 1695;
            // this.maxYear = 1832;
        }
    };
    /////////////////////////////////////////*********END BUTTONS AND SLIDERS FUNCTIONS***********/////////////////////////////////////////
    /////////////////////////////////////////*********START FILTER FUNCTIONS***********/////////////////////////////////////////
    //https://timdeschryver.dev/blog/google-maps-as-an-angular-component
    //called at the start I think and sets up all the filter subscriptions
    VizComponent.prototype.setUpFilters = function () {
        var _this = this;
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatTableDataSource"](this.electionsMeta.elections);
        this.dataSource.paginator = this.paginator;
        this.getUniqueElections();
        this.uniqueElections.forEach(function (element) {
            var thisDynamicMarker = new google.maps.Marker();
            thisDynamicMarker.setPosition({ lat: +element.lat, lng: +element.lng });
            var image = {
                url: './assets/images/dot.svg',
                size: new google.maps.Size(20, 20),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(20, 20)
            };
            var options = {
                icon: image,
                title: element.constituency,
                visible: element.countyboroughuniv == "C" ? false : true,
                label: { text: element.constituency, color: "white" }
            };
            thisDynamicMarker.setOptions(options);
            _this.dynamicMarkers.push(thisDynamicMarker);
        });
        var dialogRef = this.dialog.open(_dialogue_dialogue_component__WEBPACK_IMPORTED_MODULE_19__["DialogueComponent"], {
            data: this.uniqueElections,
        });
        dialogRef.afterClosed().subscribe(function (data) { return _this.setSearchFromDialogue(data); });
        this.constituencyFilter.valueChanges.subscribe(function (constituencyFilterValue) {
            console.log("change in consituencyfilter");
            _this.filteredValues['constituency'] = constituencyFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.monthFilter.valueChanges.subscribe(function (monthFilterValue) {
            _this.filteredValues['election_month'] = monthFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.yearFilter.valueChanges.subscribe(function (yearFilterValue) {
            var yearRange = yearFilterValue.split(",");
            _this.setDateSlider();
            _this.filteredValues['election_year'] = yearFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.countyFilter.valueChanges.subscribe(function (countyFilterValue) {
            _this.filteredValues['countyboroughuniv'] = countyFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.contestedFilter.valueChanges.subscribe(function (contestedFilterValue) {
            _this.filteredValues['contested'] = contestedFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.byElectionGeneralFilter.valueChanges.subscribe(function (byElectionGeneralFilterValue) {
            _this.filteredValues['by_election_general'] = byElectionGeneralFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.byElectionCauseFilter.valueChanges.subscribe(function (byElectionCauseFilterValue) {
            _this.filteredValues['by_election_cause'] = byElectionCauseFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.franchiseFilter.valueChanges.subscribe(function (franchiseFilterValue) {
            _this.filteredValues['franchise_type'] = franchiseFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.pollBookCodeFilter.valueChanges.subscribe(function (pollBookCodeFilterValue) {
            _this.filteredValues['pollbook_id'] = pollBookCodeFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.onDataSubscriptionChange();
        });
        this.dataSource.filterPredicate = this.customFilterPredicate();
    };
    VizComponent.prototype.onDataSubscriptionChange = function () {
        var _this = this;
        console.log("sub change");
        this.electionsPerYear = this.getElectionsPerYear();
        this.updateIsActive(this.getFilteredConstituencies());
        this.setMapStyle();
        this.dynamicMarkers.forEach(function (delement) {
            var inData = false;
            var cbu = "";
            _this.dataSource.filteredData.forEach(function (felement) {
                if (delement.getTitle().trim() == felement.constituency.trim()) {
                    inData = true;
                    cbu = felement.countyboroughuniv;
                }
            });
            if (inData) {
                var image = {
                    url: './assets/images/smarker.svg',
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                var options = {
                    icon: image,
                    title: delement.getTitle(),
                    visible: cbu == "C" ? false : true,
                    label: { text: delement.getTitle(), color: "white" }
                };
                delement.setOptions(options);
            }
            else {
                var image = {
                    url: './assets/images/dot.svg',
                    size: new google.maps.Size(20, 20),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 10),
                    scaledSize: new google.maps.Size(20, 20)
                };
                var options = {
                    icon: image,
                    title: delement.getTitle(),
                    visible: cbu == "C" ? false : true,
                    label: { text: delement.getTitle(), color: "white" }
                };
                delement.setOptions(options);
            }
        });
    };
    //what it sound slike, set all the searches to blank and include all daata
    VizComponent.prototype.clearSearch = function () {
        this.constituencyFilter.setValue("");
        this.monthFilter.setValue("");
        this.countyFilter.setValue("");
        this.contestedFilter.setValue("");
        this.byElectionGeneralFilter.setValue("");
        this.byElectionCauseFilter.setValue("");
        this.franchiseFilter.setValue("");
        this.pollBookCodeFilter.setValue("");
        this.constituencyFilter.setValue("");
        this.dataSource.filter = JSON.stringify(this.filteredValues);
    };
    //returns a list of unique consituency names
    VizComponent.prototype.getFilteredConstituencies = function () {
        var filteredConstituencies = this.dataSource.filteredData.map(function (item) { return item.constituency; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        return filteredConstituencies;
    };
    VizComponent.prototype.customFilterPredicate = function () {
        var _this = this;
        this.pollBooks = null;
        var myFilterPredicate = function (data, filter) {
            var globalMatch = !_this.globalFilter;
            if (_this.globalFilter) {
                globalMatch = data.election_month.toString().trim().toLowerCase().indexOf(_this.globalFilter.toLowerCase()) !== -1
                    || data.constituency.toString().trim().toLowerCase().indexOf(_this.globalFilter.toLowerCase()) !== -1
                    || data.countyboroughuniv.toString().trim().toLowerCase().indexOf(_this.globalFilter.toLowerCase()) !== -1
                    || data.franchise_type.toString().trim().toLowerCase().indexOf(_this.globalFilter.toLowerCase()) !== -1
                    || data.by_election_general.toString().trim().toLowerCase().indexOf(_this.globalFilter.toLowerCase()) !== -1;
            }
            if (!globalMatch) {
                return;
            }
            var searchString = JSON.parse(filter);
            return _this.hasConstituencies(data, searchString)
                && _this.hasMonths(data, searchString)
                && _this.hasYears(data, searchString)
                && data.countyboroughuniv.toString().trim().toLowerCase().indexOf(searchString.countyboroughuniv.toLowerCase()) !== -1
                && data.contested.toString().trim().toLowerCase().indexOf(searchString.contested.toLowerCase()) !== -1
                && data.by_election_general.toString().trim().toLowerCase().indexOf(searchString.by_election_general.toLowerCase()) !== -1
                && data.by_election_cause.toString().trim().toLowerCase().indexOf(searchString.by_election_cause.toLowerCase()) !== -1
                && data.contested.toString().trim().toLowerCase().indexOf(searchString.contested.toLowerCase()) !== -1
                && data.franchise_type.toString().trim().toLowerCase().indexOf(searchString.franchise_type.toLowerCase()) !== -1
                && _this.getHasPollBooksFilter(data.pollbook_id.toString().trim().toLowerCase(), searchString.pollbook_id.toLowerCase()) !== -1;
        };
        return myFilterPredicate;
    };
    VizComponent.prototype.hasConstituencies = function (data, searchString) {
        if (searchString.constituency.includes(",")) {
            var constituencyList = searchString.constituency.split(",");
            for (var i = 0; i < constituencyList.length; i++) {
                if (constituencyList[i].trim().toLowerCase() === data.constituency.toString().trim().toLowerCase()) {
                    return 1;
                }
            }
            return 0;
        }
        else {
            return data.constituency.toString().trim().toLowerCase().indexOf(searchString.constituency.toLowerCase()) !== -1;
        }
        return 0;
    };
    VizComponent.prototype.hasMonths = function (data, searchString) {
        if (searchString.election_month.includes(",")) {
            var monthList = searchString.election_month.split(",");
            for (var i = 0; i < monthList.length; i++) {
                if (monthList[i].trim() === data.election_month.toString().trim()) {
                    return 1;
                }
            }
            return 0;
        }
        else {
            return data.election_month.toString().trim().indexOf(searchString.election_month) !== -1;
        }
        return 0;
    };
    VizComponent.prototype.hasYears = function (data, searchString) {
        if (searchString.election_year.includes(",")) {
            var yearList = searchString.election_year.split(",");
            for (var i = 0; i < yearList.length; i++) {
                if (yearList[i].trim() === data.election_year.toString().trim()) {
                    return 1;
                }
            }
            return 0;
        }
        else if (searchString.election_year.includes("-") && searchString.election_year.length == 9) {
            var yearRange = searchString.election_year.split("-");
            if (yearRange.length == 2) {
                var lowRange = parseInt(yearRange[0].trim());
                var highRange = parseInt(yearRange[1].trim());
                var thisYear = parseInt(data.election_year.toString().trim());
                if (thisYear >= lowRange && thisYear <= highRange)
                    return 1;
            }
        }
        else if (searchString.election_year.length == 4) {
            return data.election_year.toString().trim().indexOf(searchString.election_year) !== -1;
        }
        return 0;
    };
    VizComponent.prototype.yearInRange = function (data, searchString, year) {
        //for some reson the search term isn't coming throuhg
        if (this.yearFilter.value.length == 0)
            return 0;
        //if this is a year range separated by a hyphen
        if (this.yearFilter.value.indexOf("-") != -1) {
            var yearRange = this.yearFilter.value.split("-");
            if (yearRange.length == 2) {
                if (yearRange[0].trim().length == 4 && yearRange[1].trim().length == 4) {
                    if (year >= parseInt(yearRange[0].trim()) && year <= parseInt(yearRange[1].trim()))
                        return 0;
                }
                else if (yearRange[0].trim().length == 4 && yearRange[1].trim().length != 4) {
                    if (year == parseInt(yearRange[0].trim()))
                        return 0;
                }
            }
        }
        //otherwise assume it's a lst
        else {
            if (this.yearFilter.value.includes(",")) {
                var yearList = this.yearFilter.value.split(",");
                for (var i = 0; i < yearList.length; i++) {
                    if (yearList[i].trim() === year.trim()) {
                        return 1;
                    }
                }
                return 0;
            }
            else {
                return this.yearFilter.value.toString().trim().indexOf(year) !== -1;
            }
        }
        return -1;
    };
    VizComponent.prototype.getHasPollBooksFilter = function (pollbook_id, searchTerm) {
        if (searchTerm == 'y') {
            if (pollbook_id.length > 1) {
                return 0;
            }
            else {
                return -1;
            }
        }
        else if (searchTerm == 'n') {
            if (pollbook_id.length == 0) {
                return 0;
            }
            else {
                return -1;
            }
        }
        return 0;
    };
    ///////////////////////////////////****END FILTER FUNCTIONS****///////////////////////////////////
    ///////////////////////////////////****START DIALOGUE FUNCTIONS****///////////////////////////////////
    VizComponent.prototype.openPollBookDialog = function () {
        var dialogRef = this.dialog.open(_pollbook_dialogue_pollbook_dialogue_component__WEBPACK_IMPORTED_MODULE_18__["PollbookDialogueComponent"], {
            data: this.pollBooks,
        });
    };
    //open the main search dialogue (this is called from the gui button to)
    VizComponent.prototype.openFormDialogue = function () {
        var _this = this;
        this.clearSearch();
        var dialogRef = this.dialog.open(_dialogue_dialogue_component__WEBPACK_IMPORTED_MODULE_19__["DialogueComponent"], {
            data: this.uniqueElections,
        });
        dialogRef.afterClosed().subscribe(function (data) { return _this.setSearchFromDialogue(data); });
    };
    //calledf rom within the dialogu
    VizComponent.prototype.setSearchFromDialogue = function (data) {
        //	console.log("Dialog output for search:", data);
        if (data != undefined) {
            //theres a make a random search button in the modal search dialogu
            if (data.triggerRandomSearch) {
                this.generateRandomSearch();
            }
            //otherwise lets actuallyupdate all the filters
            if (data.updateSearch) {
                if (data.constituency != null) {
                    this.constituencyFilter.setValue(data.constituency);
                }
                else {
                    this.constituencyFilter.setValue("");
                }
                if (data.year != null) {
                    this.yearFilter.setValue(data.year);
                }
                else {
                    this.yearFilter.setValue("");
                }
                if (data.month != null) {
                    this.monthFilter.setValue(data.month);
                }
                else {
                    this.monthFilter.setValue("");
                }
                if (data.county != null) {
                    this.countyFilter.setValue(data.county);
                }
                else {
                    this.countyFilter.setValue("");
                }
                if (data.contested != null) {
                    this.contestedFilter.setValue(data.contested);
                }
                else {
                    this.contestedFilter.setValue("");
                }
                if (data.byElectionGeneral != null) {
                    this.byElectionGeneralFilter.setValue(data.byElectionGeneral);
                }
                else {
                    this.byElectionGeneralFilter.setValue("");
                }
                if (data.pollBookCode != null) {
                    this.pollBookCodeFilter.setValue(data.pollBookCode);
                }
                else {
                    this.pollBookCodeFilter.setValue("");
                }
                this.dataSource.filter = JSON.stringify(this.filteredValues);
            }
        }
    };
    ///////////////////////////////////****END DIALOGUE FUNCTIONS****///////////////////////////////////
    ///////////////////////////////////****START MAP STYLES****///////////////////////////////////
    VizComponent.prototype.getStyles = function () {
        var styles = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#999999"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ];
        return styles;
    };
    VizComponent.ɵfac = function VizComponent_Factory(t) { return new (t || VizComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_centroids_service__WEBPACK_IMPORTED_MODULE_5__["CentroidsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_borough_service__WEBPACK_IMPORTED_MODULE_4__["BoroughService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_hop_service__WEBPACK_IMPORTED_MODULE_7__["HOPService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_download_poll_books_service__WEBPACK_IMPORTED_MODULE_9__["DownloadPollBooksService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_download_service__WEBPACK_IMPORTED_MODULE_8__["DownloadService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_get_elections_service__WEBPACK_IMPORTED_MODULE_3__["GetElectionsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_geojson_service_service__WEBPACK_IMPORTED_MODULE_2__["GeojsonServiceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_get_poll_books_service__WEBPACK_IMPORTED_MODULE_6__["GetPollBooksService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_get_lat_lon_service__WEBPACK_IMPORTED_MODULE_10__["GetLatLonService"])); };
    VizComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VizComponent, selectors: [["ng-component"]], viewQuery: function VizComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__["MatPaginator"], 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["GoogleMap"], 1);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.map = _t.first);
        } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 27, vars: 19, consts: [["id", "container"], [1, "map-container"], ["height", "1000px", "width", "100%", 3, "zoom", "center", "options", "tilesloaded", "zoomChanged", "idle"], [3, "position", "options", 4, "ngFor", "ngForOf"], ["mwlResizable", "", "id", "info_window", 3, "enableGhostResize", "ngStyle", "resizeEdges", "resizeEnd", "resizeStart"], ["style", "color:white; margin-top: 2%", 4, "ngIf"], ["id", "graph_container", 2, "width", "100%", "position", "relative"], ["gcontainer", ""], ["style", "width:100%; background-color: #ffd740;  ", "class", "bar", 3, "matTooltip", "ngStyle", 4, "ngFor", "ngForOf"], ["style", "width:100%;background-color: #0db9f0;   ", "class", "bar", 3, "matTooltip", "ngStyle", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", 1, "button_option", 3, "click"], [2, "z-index", "20000", 3, "value", "highValue", "options", "valueChange", "highValueChange", "userChange"], ["mat-table", "", "class", "mat-elevation-z8 mytable style-3 stay_inline", 3, "dataSource", 4, "ngIf"], ["id", "pagin", "showFirstLastButtons", "", 3, "pageSize", "pageSizeOptions"], ["mat-icon-button", "", "aria-label", "download our data", 3, "click"], ["id", "HOPtext", 4, "ngIf"], [3, "position", "options"], [2, "color", "white", "margin-top", "2%"], [2, "color", "#ffd740"], [2, "color", "#0db9f0"], [1, "bar", 2, "width", "100%", "background-color", "#ffd740", 3, "matTooltip", "ngStyle"], [1, "bar", 2, "width", "100%", "background-color", "#0db9f0", 3, "matTooltip", "ngStyle"], ["mat-table", "", 1, "mat-elevation-z8", "mytable", "style-3", "stay_inline", 3, "dataSource"], ["matColumnDef", "constituency"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "election_month"], ["matColumnDef", "election_year"], ["matColumnDef", "countyboroughuniv"], ["matColumnDef", "contested"], ["matColumnDef", "by_election_general"], ["matColumnDef", "by_election_cause"], ["matColumnDef", "franchise_type"], ["matColumnDef", "pollbook_id"], ["mat-cell", "", "id", "pollBookCell", 3, "click", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["matTooltip", "click to find out more about consitituencies", 3, "matTooltipPosition"], ["matInput", "", "placeholder", "....", 1, "form-field", 3, "formControl"], ["mat-cell", ""], ["matTooltip", "click to find out more about months", 3, "matTooltipPosition"], ["matTooltip", "click to find out more about years", 3, "matTooltipPosition"], ["matTooltip", "click to find out more about the different kinds of elections", 3, "matTooltipPosition"], [3, "formControl", "value", "valueChange"], ["value", ""], ["value", "C"], ["value", "B"], ["value", "U"], ["matTooltip", "Not all elections were fought. click to find out more", 3, "matTooltipPosition"], ["value", "Y"], ["value", "N"], ["matTooltip", "general elections happened every 4 years. click to find out more about them", 3, "matTooltipPosition"], ["value", "G"], ["matTooltip", "click to find out more about franchiseTypes", 3, "matTooltipPosition"], ["matTooltip", "poll books contain important details of voters. click to find out more", 3, "matTooltipPosition"], ["mat-cell", "", "id", "pollBookCell", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["id", "HOPtext"]], template: function VizComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "google-map", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("tilesloaded", function VizComponent_Template_google_map_tilesloaded_2_listener() { return ctx.mapReady(); })("zoomChanged", function VizComponent_Template_google_map_zoomChanged_2_listener() { return ctx.mapZoomChanged(); })("idle", function VizComponent_Template_google_map_idle_2_listener() { return ctx.mapIdle(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, VizComponent_map_marker_3_Template, 1, 5, "map-marker", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resizeEnd", function VizComponent_Template_div_resizeEnd_4_listener($event) { return ctx.onResizeEnd($event); })("resizeStart", function VizComponent_Template_div_resizeStart_4_listener($event) { return ctx.onResizeStart($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, VizComponent_div_5_Template, 7, 3, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6, 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, VizComponent_div_9_Template, 1, 3, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, VizComponent_div_10_Template, 1, 3, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VizComponent_Template_button_click_12_listener() { return ctx.openFormDialogue(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "OPEN FORM");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VizComponent_Template_button_click_14_listener() { return ctx.clearSearch(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "CLEAR");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VizComponent_Template_button_click_16_listener() { return ctx.animateTimeLine(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "ANIMATE");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "ng5-slider", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function VizComponent_Template_ng5_slider_valueChange_20_listener($event) { return ctx.minYear = $event; })("highValueChange", function VizComponent_Template_ng5_slider_highValueChange_20_listener($event) { return ctx.maxYear = $event; })("userChange", function VizComponent_Template_ng5_slider_userChange_20_listener($event) { return ctx.sliderChange($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, VizComponent_table_21_Template, 30, 3, "table", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "mat-paginator", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VizComponent_Template_button_click_23_listener() { return ctx.download(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "cloud_download");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, VizComponent_div_26_Template, 2, 2, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("zoom", ctx.zoom)("center", ctx.center)("options", ctx.options);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dynamicMarkers);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("enableGhostResize", true)("ngStyle", ctx.style)("resizeEdges", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](17, _c1));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.dataSource.filteredData);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.electionsPerYear);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.electionsPerYear);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.minYear)("highValue", ctx.maxYear)("options", ctx.sliderOptions);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.dataSource);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("pageSize", 10)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c2));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.HOPtext);
        } }, directives: [_angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["GoogleMap"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgForOf"], angular_resizable_element__WEBPACK_IMPORTED_MODULE_21__["ResizableDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_22__["MatButton"], ng5_slider__WEBPACK_IMPORTED_MODULE_11__["ɵa"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__["MatPaginator"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__["MatIcon"], _angular_google_maps__WEBPACK_IMPORTED_MODULE_1__["MapMarker"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_24__["MatTooltip"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatHeaderCell"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_26__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_16__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_16__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormControlDirective"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatCell"], _angular_material_select__WEBPACK_IMPORTED_MODULE_27__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_28__["MatOption"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatRow"]], styles: ["@import url(\"https://fonts.googleapis.com/icon?family=Material+Icons\");\nhtml[_ngcontent-%COMP%] {\n  background-color: black;\n}\n*[_ngcontent-%COMP%] {\n  font-family: Lato;\n}\n.material-icons[_ngcontent-%COMP%] {\n  font-family: \"Material Icons\" !important;\n}\nstrong[_ngcontent-%COMP%] {\n  \n}\nmwlResizable[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n#container[_ngcontent-%COMP%] {\n  padding-left: 30px;\n  padding-right: 30px;\n}\nmat-radio-group[_ngcontent-%COMP%] {\n  color: white;\n}\nh1[_ngcontent-%COMP%] {\n  position: relative;\n  top: 10px;\n  padding: 2%;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: white;\n  z-index: 10;\n  font-family: \"Cabin\", sans-serif;\n}\n.button_option[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  margin-top: 10px;\n  font-family: \"Catamaran\";\n}\n.map-container[_ngcontent-%COMP%] {\n  \n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  \n  background-color: black;\n}\n#graph_container[_ngcontent-%COMP%] {\n  \n  height: 60px;\n  \n  margin-bottom: 1%;\n  border-radius: 10px 0px 0px 0px;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.bar[_ngcontent-%COMP%] {\n  \n  bottom: 0px;\n  position: absolute;\n  border-radius: 10px 0px 0px 0px;\n  transition: height 1s;\n}\nagm-map[_ngcontent-%COMP%] {\n  \n  position: relative;\n  height: 100%;\n  width: 100%;\n}\n#info_window[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 6%;\n  min-width: 200px;\n  width: 40%;\n  height: 80%;\n  padding: 18px;\n  background-color: rgba(255, 255, 255, 0.4);\n  \n  right: 3%;\n  z-index: 1000;\n  border-radius: 10px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n#slider-container[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  \n}\n  .ng5-slider .ng5-slider-bubble {\n  \n  color: white !important;\n}\n.stay_inline[_ngcontent-%COMP%] {\n  margin: 0px, auto;\n  display: inline-block;\n  vertical-align: top;\n}\n#clear_map[_ngcontent-%COMP%] {\n  border-radius: 10px 0px 0px 0px !important;\n  border: 0px;\n  margin-bottom: 1%;\n  padding: 5px;\n  float: right;\n}\ntable[_ngcontent-%COMP%] {\n  border-radius: 10px 0px 0px 0px;\n  width: 100%;\n  padding-top: 10px;\n  margin-bottom: 2%;\n  overflow: scroll;\n  \n  \n}\n#pagin[_ngcontent-%COMP%] {\n  border-radius: 10px 0px 0px 0px;\n}\n.mat-form-field[_ngcontent-%COMP%] {\n  width: 80px;\n}\n.mat-column-Year[_ngcontent-%COMP%] {\n  flex: 0 0 100px;\n}\n.mat-row[_ngcontent-%COMP%] {\n  height: auto;\n}\n#pollBookCell[_ngcontent-%COMP%]:hover {\n  background-color: #c8c8c8;\n}\n.mat-cell[_ngcontent-%COMP%] {\n  padding-right: 10px;\n  padding-bottom: 10px;\n  padding-top: 5px;\n}\n#HOPtext[_ngcontent-%COMP%] {\n  margin-top: 2%;\n  padding: 10px;\n  font-family: Lato;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white;\n  \n  width: 97%;\n  margin-bottom: 2%;\n  \n  border-radius: 10px 0px 0px 0px;\n}\nsection[_ngcontent-%COMP%] {\n  display: table;\n  margin: 8px;\n}\n.style-3[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.63);\n  background-color: orange;\n}\n.style-3[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  background-color: orange;\n}\n.style-3[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: orange;\n}\n.example-label[_ngcontent-%COMP%] {\n  display: table-cell;\n  font-size: 14px;\n  margin-left: 8px;\n  width: 120px;\n}\n.example-button-row[_ngcontent-%COMP%] {\n  display: table-cell;\n}\n.example-button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: table-cell;\n  margin-right: 8px;\n}\n.example-flex-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  width: 480px;\n}\n.example-button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  width: 120px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Zpei5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBUSxzRUFBQTtBQUNSO0VBQ0ksdUJBQUE7QUFDSjtBQUVBO0VBQ0ksaUJBQUE7QUFDSjtBQUVBO0VBQ0ksd0NBQUE7QUFDSjtBQUVBO0VBQ0ksNEJBQUE7QUFDSjtBQUVBO0VBQ0ksc0JBQUE7QUFDSjtBQUVBO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtBQUNKO0FBRUE7RUFDSSxZQUFBO0FBQ0o7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0NBQUE7QUFDSjtBQUVBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0FBQ0o7QUFFQTtFQUNJLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0Esb0JBQUE7RUFDQSx1QkFBQTtBQUNKO0FBRUE7RUFDSSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsK0JBQUE7RUFDQSxvQ0FBQTtBQUNKO0FBRUE7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxxQkFBQTtBQUNKO0FBRUE7RUFDSTs7OztvQkFBQTtFQUtBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFDSjtBQUVBO0VBQ0ksZUFBQTtFQUNBLE9BQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLDBDQUFBO0VBQ0EsMEJBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNKO0FBRUE7RUFDSSxtQkFBQTtFQUNBLHFCQUFBO0FBQ0o7QUFHSTtFQUNJLHFCQUFBO0VBQ0EsdUJBQUE7QUFBUjtBQUlBO0VBQ0ksaUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FBREo7QUFJQTtFQUNJLDBDQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFESjtBQUlBO0VBQ0ksK0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQTs7O3VCQUFBO0FBRUo7QUFJQTtFQUNJLCtCQUFBO0FBREo7QUFJQTtFQUNJLFdBQUE7QUFESjtBQUlBO0VBQ0ksZUFBQTtBQURKO0FBSUE7RUFDSSxZQUFBO0FBREo7QUFJQTtFQUNJLHlCQUFBO0FBREo7QUFJQTtFQUNJLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQURKO0FBSUE7RUFDSSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLDBCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5Q0FBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsK0JBQUE7QUFESjtBQUlBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7QUFESjtBQUlBO0VBQ0kscURBQUE7RUFDQSx3QkFBQTtBQURKO0FBSUE7RUFDSSxVQUFBO0VBQ0Esd0JBQUE7QUFESjtBQUlBO0VBQ0ksd0JBQUE7QUFESjtBQUlBO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBREo7QUFJQTtFQUNJLG1CQUFBO0FBREo7QUFJQTtFQUNJLG1CQUFBO0VBQ0EsaUJBQUE7QUFESjtBQUlBO0VBQ0ksYUFBQTtFQUNBLDhCQUFBO0VBQ0EsWUFBQTtBQURKO0FBSUE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBREoiLCJmaWxlIjoidml6LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zXCIpO1xuaHRtbCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG5cbioge1xuICAgIGZvbnQtZmFtaWx5OiBMYXRvO1xufVxuXG4ubWF0ZXJpYWwtaWNvbnMge1xuICAgIGZvbnQtZmFtaWx5OiAnTWF0ZXJpYWwgSWNvbnMnICFpbXBvcnRhbnQ7XG59XG5cbnN0cm9uZyB7XG4gICAgLypjb2xvcjojZmZkNzQwICFpbXBvcnRhbnQ7Ki9cbn1cblxubXdsUmVzaXphYmxlIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvLyByZXF1aXJlZCBmb3IgdGhlIGVuYWJsZUdob3N0UmVzaXplIG9wdGlvbiB0byB3b3JrXG59XG5cbiNjb250YWluZXIge1xuICAgIHBhZGRpbmctbGVmdDogMzBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xufVxuXG5tYXQtcmFkaW8tZ3JvdXAge1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuaDEge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDEwcHg7XG4gICAgcGFkZGluZzogMiU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxMDtcbiAgICBmb250LWZhbWlseTogJ0NhYmluJywgc2Fucy1zZXJpZjtcbn1cblxuLmJ1dHRvbl9vcHRpb24ge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIGZvbnQtZmFtaWx5OiAnQ2F0YW1hcmFuJztcbn1cblxuLm1hcC1jb250YWluZXIge1xuICAgIC8qcG9zaXRpb246cmVsYXRpdmU7Ki9cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIC8qYm9yZGVyLWNvbG9yOnJlZDsqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuXG4jZ3JhcGhfY29udGFpbmVyIHtcbiAgICAvKnBvc2l0aW9uOiByZWxhdGl2ZTsqL1xuICAgIGhlaWdodDogNjBweDtcbiAgICAvKm1hcmdpbi10b3A6IDElOyovXG4gICAgbWFyZ2luLWJvdHRvbTogMSU7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweCAwcHggMHB4IDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG5cbi5iYXIge1xuICAgIC8qaGVpZ2h0OjIlOyovXG4gICAgYm90dG9tOiAwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHggMHB4IDBweCAwcHg7XG4gICAgdHJhbnNpdGlvbjogaGVpZ2h0IDFzO1xufVxuXG5hZ20tbWFwIHtcbiAgICAvKiB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsqL1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbiNpbmZvX3dpbmRvdyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogNiU7XG4gICAgbWluLXdpZHRoOiAyMDBweDtcbiAgICB3aWR0aDogNDAlO1xuICAgIGhlaWdodDogODAlO1xuICAgIHBhZGRpbmc6IDE4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xuICAgIC8qYmFja2dyb3VuZC1jb2xvcjogcGluazsqL1xuICAgIHJpZ2h0OiAzJTtcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuI3NsaWRlci1jb250YWluZXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgLyptYXJnaW4tYm90dG9tOiAyJTsqL1xufVxuXG4gOjpuZy1kZWVwIHtcbiAgICAubmc1LXNsaWRlciAubmc1LXNsaWRlci1idWJibGUge1xuICAgICAgICAvKmJhY2tncm91bmQ6IHdoaXRlOyovXG4gICAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgIH1cbn1cblxuLnN0YXlfaW5saW5lIHtcbiAgICBtYXJnaW46IDBweCwgYXV0bztcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuI2NsZWFyX21hcCB7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweCAwcHggMHB4IDBweCAhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDElO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBmbG9hdDogcmlnaHQ7XG59XG5cbnRhYmxlIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4IDBweCAwcHggMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIlO1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgLyp2aXNpYmlsaXR5OiBoaWRkZW47Ki9cbiAgICAvKiAgZGlzcGxheTpibG9jaztcbiAgd2lkdGg6IDQwJTtcbiAgcGFkZGluZzoxJTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDsqL1xufVxuXG4jcGFnaW4ge1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHggMHB4IDBweCAwcHg7XG59XG5cbi5tYXQtZm9ybS1maWVsZCB7XG4gICAgd2lkdGg6IDgwcHg7XG59XG5cbi5tYXQtY29sdW1uLVllYXIge1xuICAgIGZsZXg6IDAgMCAxMDBweDtcbn1cblxuLm1hdC1yb3cge1xuICAgIGhlaWdodDogYXV0bztcbn1cblxuI3BvbGxCb29rQ2VsbDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMDAsIDIwMCwgMjAwLCAxKTtcbn1cblxuLm1hdC1jZWxsIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIHBhZGRpbmctdG9wOiA1cHg7XG59XG5cbiNIT1B0ZXh0IHtcbiAgICBtYXJnaW4tdG9wOiAyJTtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGZvbnQtZmFtaWx5OiBMYXRvO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuODcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIC8qVE9ETyBGSU5EIE91dCB3aHkgdGhpcyB3aWR0aCBpcyB3cm9uZyEqL1xuICAgIHdpZHRoOiA5NyU7XG4gICAgbWFyZ2luLWJvdHRvbTogMiU7XG4gICAgLypvdmVyZmxvdzogc2Nyb2xsOyovXG4gICAgYm9yZGVyLXJhZGl1czogMTBweCAwcHggMHB4IDBweDtcbn1cblxuc2VjdGlvbiB7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgbWFyZ2luOiA4cHg7XG59XG5cbi5zdHlsZS0zOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC42Myk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuXG4uc3R5bGUtMzo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiA2cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuXG4uc3R5bGUtMzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbn1cblxuLmV4YW1wbGUtbGFiZWwge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XG4gICAgd2lkdGg6IDEyMHB4O1xufVxuXG4uZXhhbXBsZS1idXR0b24tcm93IHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xufVxuXG4uZXhhbXBsZS1idXR0b24tcm93IGJ1dHRvbiB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuLmV4YW1wbGUtZmxleC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHdpZHRoOiA0ODBweDtcbn1cblxuLmV4YW1wbGUtYnV0dG9uLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB3aWR0aDogMTIwcHg7XG59Il19 */"] });
    return VizComponent;
}());



/***/ }),

/***/ "zHhC":
/*!**************************************!*\
  !*** ./src/app/api/api.component.ts ***!
  \**************************************/
/*! exports provided: ApiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiComponent", function() { return ApiComponent; });
/* harmony import */ var swagger_ui_dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swagger-ui-dist */ "Sgou");
/* harmony import */ var swagger_ui_dist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(swagger_ui_dist__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var ApiComponent = /** @class */ (function () {
    function ApiComponent() {
    }
    ApiComponent.prototype.ngOnInit = function () {
        var ui = Object(swagger_ui_dist__WEBPACK_IMPORTED_MODULE_0__["SwaggerUIBundle"])({
            dom_id: '#swagger-ui',
            layout: 'BaseLayout',
            presets: [
                swagger_ui_dist__WEBPACK_IMPORTED_MODULE_0__["SwaggerUIBundle"].presets.apis,
                swagger_ui_dist__WEBPACK_IMPORTED_MODULE_0__["SwaggerUIBundle"].SwaggerUIStandalonePreset
            ],
            url: 'https://raw.githubusercontent.com/Digital-Cultures/ECPPEC/Angular11/php/ecppec.yaml',
            operationsSorter: 'alpha'
        });
    };
    ApiComponent.ɵfac = function ApiComponent_Factory(t) { return new (t || ApiComponent)(); };
    ApiComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ApiComponent, selectors: [["app-api"]], decls: 1, vars: 0, consts: [["id", "swagger-ui"]], template: function ApiComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
        } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcGkuY29tcG9uZW50LnNjc3MifQ== */"] });
    return ApiComponent;
}());



/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfills */ "hN/g");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");



_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]).then(function (ref) {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
        window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
    // Otherise, log the boot error
}).catch(function (err) { return console.error(err); });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map