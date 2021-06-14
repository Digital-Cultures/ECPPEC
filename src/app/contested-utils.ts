import { DatasourceService } from './datasource.service';

export class ContestedUtils {
    constructor(private datasourceService: DatasourceService) { }
    years: number[]  =[];
    start: number = 1695;
    end: number = 1835;
    getFranchiseTypes(){
        var franchise_types = [];
        var franchise_data = [];
        this.datasourceService.dataSource.filteredData.forEach(element =>{
          if(franchise_types.indexOf(element.franchise_type.trim())==-1 && element.franchise_type.trim().length>3){
            franchise_types.push(element.franchise_type.trim());
          }
        }
        )
      }
      getByElectionCauses(){
        var causes = [];
        this.datasourceService.dataSource.filteredData.forEach(element => {
          if(causes.indexOf(element.by_election_cause)==-1 &&element.by_election_cause.length>1){
            causes.push(element.by_election_cause);
          }
        });
        return causes;
      }
      countContested(data){
      //  console.log("data",data);
        var count = 0;
        data.forEach(element => {
          if(element.contested.trim()=="Y"){
           // console.log("contested",element);
            count++;
          }
        });
        return count;
      }
      compareByElectionYear( a, b ) {
        if ( a.election_year < b.election_year ){
          return -1;
        }
        if ( a.election_year > b.election_year ){
          return 1;
        }
        return 0;
      }
      numberMap (val, in_min, in_max, out_min, out_max) {
        return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }
        formatLabel(name,percent){
            console.log(name,percent);
            var p = percent.toString();
            var sp = p.split(".");
            return name + " "+ sp[0] +"% contested";
        
          }
          getHasPollBooksFilter(pollbook_id, searchTerm) {
            if (searchTerm == 'y') {
                if (pollbook_id.length > 1) {
                    return 0;
                } else {
                    return -1;
                }
            }
            else if (searchTerm == 'n') {
                if (pollbook_id.length == 0) {
                    return 0;
                } else {
                    return -1;
                }
            }
            return 0;
        }
getStartEndYears(){
    var startYear = this.datasourceService.electionsMeta.earliest_year;
    var endYear = this.datasourceService.electionsMeta.latest_year ;
    if(this.datasourceService.yearFilter.value!=null){
      if(this.datasourceService.yearFilter.value.indexOf("-")==-1) {
        startYear = parseInt(this.datasourceService.yearFilter.value);
        endYear = parseInt(this.datasourceService.yearFilter.value);
      }
      else{
        var exploded = this.datasourceService.yearFilter.value.split("-");
        if (exploded.length == 2){
          startYear = parseInt(exploded[0].trim());
          endYear = parseInt(exploded[1].trim());
        }
      }
    }
    return { startYear: startYear, endYear: endYear}
  }
  getContestedElectionsPerNoneEmptyYearCB(cb, neys, data){
   
    let epy :number []= [];
    let cpy: number [] = [];
    neys.forEach(element => {
      epy.push(0);
      cpy.push(0);
    });


    data.forEach(element => {
      if(neys.indexOf(element.election_year)!=-1 && element.contested=="Y" && element.countyboroughuniv==cb){
        cpy [neys.indexOf(element.election_year)]++;
      }
      if(neys.indexOf(element.election_year)!=-1 && element.countyboroughuniv==cb ){
        epy [neys.indexOf(element.election_year)]++;
      }
      
    });
    for(var i=0;i<epy.length;i++){
      if(epy[i]>0) cpy[i] = (cpy[i]/epy[i]) *100;
    }
    console.log("large consisitency data",epy,cpy);
    
    return cpy;
  }
  getContestedElectionsPerYear(startYear, endYear, data){
   
    let epy :number []= [];
    for(var i=startYear;i<=endYear;i++){
    
      epy.push(0);
    }
    data.forEach(element => {
      var index = element.election_year -startYear;
      if(element.contested=="Y") epy[index]++;
    });
    return epy;
  }
  getContestedElectionsPerYearCB(startYear, endYear, cb, data){
   
    let epy :number []= [];
    for(var i=startYear;i<=endYear;i++){
    
      epy.push(0);
    }
    data.forEach(element => {
      var index = element.election_year -startYear;
      if(element.contested=="Y" && element.countyboroughuniv   ==cb) epy[index]++;
    });
    return epy;
  }
  getContestedElectionsPerNoneEmptyYear(neys, data){
   
    let epy :number []= [];
    let cpy: number [] = [];
    neys.forEach(element => {
      epy.push(0);
      cpy.push(0);
    });


    data.forEach(element => {
      if(neys.indexOf(element.election_year)!=-1 && element.contested=="Y"){
        cpy [neys.indexOf(element.election_year)]++;
      }
      if(neys.indexOf(element.election_year)!=-1 ){
        epy [neys.indexOf(element.election_year)]++;
      }
      
    });
    for(var i=0;i<epy.length;i++){
      if(epy[i]>0) cpy[i] = (cpy[i]/epy[i]) *100;
    }
    
    return cpy;
  }
  getContestedElectionsPerNoneEmptyYearLargeConstituencies(neys, data){
    var lCs = ["Bedford", "Beverley", "Bridgnorth", "Bristol", "Canterbury", "Carlisle", "Chester", "Colchester", "Coventry", "Cricklade", "Dover", "Durham City", "Evesham", "Exeter", "Gloucester", "Hereford", "Kingston-Upon-Hull", "Lancaster", "Leicester", "Lincoln", "Liverpool", "London", "Maidstone", "Newark", "Newcastle-upon-Tyne", "Northampton", "Norwich", "Nottingham", "Oxford", "Southwark", "Westminster", "Worcester", "York"];
    let epy :number []= [];
    let cpy: number [] = [];
    neys.forEach(element => {
      epy.push(0);
      cpy.push(0);
    });


    data.forEach(element => {
      if(lCs.indexOf(element.constituency.trim())!=-1){
      if(neys.indexOf(element.election_year)!=-1 && element.contested=="Y"){
        cpy [neys.indexOf(element.election_year)]++;
      }
      if(neys.indexOf(element.election_year)!=-1 ){
        epy [neys.indexOf(element.election_year)]++;
      }
      }
    });
    for(var i=0;i<epy.length;i++){
      if(epy[i]>0) cpy[i] = (cpy[i]/epy[i]) *100;
    }
    
    return cpy;
  }
  getElectionsPerNoneEmptyYear(neys, data){
    //console.log("get per none empty")
   
    let epy :number []= [];
    neys.forEach(element => {
      epy.push(0);
     
      
    });


    data.forEach(element => {
     
      if(neys.indexOf(element.election_year)!=-1 ){
        epy [neys.indexOf(element.election_year)]++;
      }
      
    });
    //console.log("epy",epy);
    
    return epy;
  }
  getNonEmptyYears(startYear, endYear, data){
    let ney :number []= [];
    // for(var i=startYear;i<=endYear;i++){
    
    //   ney.push(0);
    // }
    data.forEach(element => {
   //   var index = element.election_year -startYear;
      if(element.election_year>=startYear && element.election_year <=endYear && ney.indexOf(element.election_year)==-1) ney.push(element.election_year)
    });
    return ney;
   }
  getEarliestFilteredYear(data){
    if(data.length>0) return  data.sort(this.compareByElectionYear)[0].election_year;
    return 0;
  }
  getLatestFilteredYear(data){
    if(data.length>0)    return data.sort(this.compareByElectionYear)[data.length-1].election_year;
    return 0;
  }
  getStartEndYearsFromData(data){
    var startYear =  0;//data.electionsMeta.earliest_year;
    var endYear = 0;//this.datasourceService.electionsMeta.latest_year ;
    if(this.datasourceService.yearFilter.value!=null){
      if(this.datasourceService.yearFilter.value.indexOf("-")==-1) {
        startYear = parseInt(this.datasourceService.yearFilter.value);
        endYear = parseInt(this.datasourceService.yearFilter.value);
      }
      else{
        var exploded = this.datasourceService.yearFilter.value.split("-");
        if (exploded.length == 2){
          startYear = parseInt(exploded[0].trim());
          endYear = parseInt(exploded[1].trim());
        }
      }
    }
    return { startYear: startYear, endYear: endYear}
  }
      

  getElectionsPerYearNew(startYear, endYear, data){
   
    let epy :number []= [];
    for(var i=startYear;i<=endYear;i++){
    
      epy.push(0);
    }
    data.forEach(element => {
      var index = element.election_year -startYear;
      epy[index]++;
    });
    return epy;
  }
      getElectionsPerYear(years){
        var startYear = this.datasourceService.electionsMeta.earliest_year;
        var endYear = this.datasourceService.electionsMeta.latest_year ;
        var startEndYears = this.getStartEndYears();
        startYear = startEndYears.startYear;
        endYear = startEndYears.endYear;
        var cpy = [];
        this.years.forEach(element => {
          cpy.push(0);
        });
        for(var i=0;i<this.datasourceService.dataSource.filteredData.length;i++){
          var index = parseInt(this.datasourceService.dataSource.filteredData[i].election_year)-this.datasourceService.electionsMeta.earliest_year;
          cpy[index]++;
        }
        
        var startIndex = startYear-this.datasourceService.electionsMeta.earliest_year;
        var yearRange = endYear- startYear;
        var endIndex = startIndex + yearRange
        var sp = [];//nor.splice(startIndex, endIndex);
      
        for(var i=startIndex;i<=endIndex ;i++){
          sp.push(cpy[i]);
        }
        // console.log("spliced","length",sp.length,"yearRange", yearRange, "startYear", startYear, "endYear",endYear, "strartIndex",startIndex, "endIndex",endIndex);
        return sp;
      }
      
      getMax(arr){
        var max = 0;
        arr.forEach(element => {
          if(element>max) max = element;
        });
        return max;
      }
      getMin(arr){
        var min = 11111110;
        arr.forEach(element => {
          if(element<min) min = element;
        });
        return min;
      }
      
      getByNormalisedElectionCauseByYear(){

        var causes = this.getByElectionCauses();
       // console.log("causes",causes);
       if(causes.length==0) return 0;
        var causesByYear = [];
        var startYear = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[0].election_year );
        var endYear = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[this.datasourceService.dataSource.filteredData.length-1].election_year );
      //  console.log("causes",causes, "startyear",startYear, "endyear",endYear);
        causes.forEach(element => {
          var data  = [];
          for(var i=startYear;i<this.end;i++){
            data.push(0);
          }
          var obj = {
          name: element,
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
              focus: 'series'
          },
          data: data
          }
          causesByYear.push(obj);
        });
        var startYear = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[0].election_year );
      
        this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear).forEach(element => {
          causesByYear.forEach(ielement => {
            if(ielement.name == element.by_election_cause){
                var whichYear = parseInt(element.election_year);
                ielement.data[whichYear-startYear]++;
            }
          });
          
        });
        //normalise
        //they all have the same number of years 
        console.log("causes by year",causesByYear);
        var numYears = causesByYear[0].data.length;
        //for each year
        for(var i=0; i<numYears;i++){
          var total =0.0;
        causesByYear.forEach(element => {
          total+= element.data[i];
         
        });
        //now go through an dmake them a percentage of the total
        causesByYear.forEach(element => {
         element.data[i] =element.data[i] /total;
         
        });
      }
        
        return causesByYear;
      
      
      }
      getByElectionCauseByYear(){

        var causes = this.getByElectionCauses();
       // console.log("causes",causes);
        var causesByYear = [];
        var startYear = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[0].election_year );
        var endYear = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[this.datasourceService.dataSource.filteredData.length-1].election_year );
        causes.forEach(element => {
          var data  = [];
          for(var i=startYear;i<this.end;i++){
            data.push(0);
          }
          var obj = {
          name: element,
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
              focus: 'series'
          },
          data: data
          }
          causesByYear.push(obj);
        });
        var startYear = parseInt(this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear)[0].election_year );
      
        this.datasourceService.dataSource.filteredData.sort(this.compareByElectionYear).forEach(element => {
          causesByYear.forEach(ielement => {
            if(ielement.name == element.by_election_cause){
                var whichYear = parseInt(element.election_year);
                ielement.data[whichYear-startYear]++;
            }
          });
          
        });
        return causesByYear;
      
      }
      getAggregatedByElectionCauses(){
        var causes = this.getByElectionCauses();
        //console.log("Causes",causes);
        var abec = {};
        causes.forEach(element => {
            abec[element]=0;
        })
        
        this.datasourceService.dataSource.filteredData.forEach(element => {
          if(element.by_election_cause.length>1 ) abec[element.by_election_cause]++;
        })
        // var data = [];
       var series = []; 
        for (const key in abec) {
            // data.push(abec[key]);
            var arr = [abec[key]];
            var obj = {
              name: key,
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: arr
          };
          series.push(obj);
      
        }
        
       // console.log("series:",series);
        return series;
      
      }
      getFranchiseData(data){
        var franchise_data = {};
    
        data.forEach(element =>{
          if(element.franchise_type.trim().length>0){
          if (element.franchise_type.trim() in franchise_data){
            franchise_data[element.franchise_type.trim()]++;
          }else{
            franchise_data[element.franchise_type.trim()]=1;
          }
        }
          
        })
        var clean_data = [];
        for (var property in franchise_data) {
          var obj = {
            value:franchise_data[property],
            name:property
          }
          clean_data.push(obj);
        }
        return clean_data;
      }
      getProportionContestedFranchiseData(data){
       // var franchise_data = {};
        var epf = {};
        var cpf = {};
        data.forEach(element =>{
          if(element.franchise_type.trim().length>0){

            //  
          if (element.franchise_type.trim() in epf){
            epf[element.franchise_type.trim()]++;
            if(element.contested=="Y") cpf[element.franchise_type.trim()]++;
          }else{
            epf[element.franchise_type.trim()]=1.0;
            element.contested.trim()=="Y" ? cpf[element.franchise_type.trim()]=1.0 :cpf[element.franchise_type.trim()]=0.0;
          }
        }
          
        })
        
        var clean_data = [];
        for (var property in cpf) {
          var proportion = (cpf[property]/epf[property])*100.0;

          var obj = {
            value:proportion,
            name:property
          }
          clean_data.push(obj);
        }
        return clean_data;
      }
      getProportionContestedFranchiseDataWODisputed(data){
        // var franchise_data = {};
         var epf = {};
         var cpf = {};
         data.forEach(element =>{
           if(element.franchise_type.trim().length>0 && element.franchise_type.trim()!="Disputed"){
 
             //  
           if (element.franchise_type.trim() in epf){
             epf[element.franchise_type.trim()]++;
             if(element.contested=="Y") cpf[element.franchise_type.trim()]++;
           }else{
             epf[element.franchise_type.trim()]=1.0;
             element.contested.trim()=="Y" ? cpf[element.franchise_type.trim()]=1.0 :cpf[element.franchise_type.trim()]=0.0;
           }
         }
           
         })
         
         var clean_data = [];
         for (var property in cpf) {
           var proportion = (cpf[property]/epf[property])*100.0;
 
           var obj = {
             value:proportion,
             name:property
           }
           clean_data.push(obj);
         }
        //  console.log("clean_data",clean_data.length,clean_data,epf,cpf);
         return clean_data;
       }
      getNumberElectionsAndContestedFromFranchiseData(data){
        // var franchise_data = {};
         var epf = {};
         var cpf = {};
         data.forEach(element =>{
           if(element.franchise_type.trim().length>0){
 
             //  
           if (element.franchise_type.trim() in epf){
             epf[element.franchise_type.trim()]++;
             if(element.contested=="Y") cpf[element.franchise_type.trim()]++;
           }else{
             epf[element.franchise_type.trim()]=1.0;
            
             element.contested.trim()=="Y" ? cpf[element.franchise_type.trim()]=1.0 :cpf[element.franchise_type.trim()]=0.0;
           }
         }
           
         })
         
         var clean_data = [];
         for (var property in cpf) {
            //conteset, num elections, franchise type
            
            var proportion = (cpf[property]/epf[property])*100.0;
           var item = [epf[property],proportion,property];
         
           clean_data.push(item);
         }
         return clean_data;
       }
       
       getNumberElectionsAndContestedPerConstituency(data){
        // var franchise_data = {};
         var epf = {};
         var cpf = {};
         var fpf = {};
         data.forEach(element =>{
           if(element.constituency.trim().length>0){
 
             //  
           if (element.constituency.trim() in epf){
             epf[element.constituency.trim()]++;
             if(element.contested.trim()=="Y") cpf[element.constituency.trim()]++;
           }else{
             epf[element.constituency.trim()]=1.0;
             element.contested.trim()=="Y" ? cpf[element.constituency.trim()]=1.0 :cpf[element.constituency.trim()]=0.0;
             fpf[element.constituency.trim()]=element.franchise_type.trim();
           }
         }
           
         })
         
         var clean_data = [];
         for (var property in cpf) {
            //conteset, num elections, franchise type
            
          var proportion = (cpf[property]/epf[property])*100.0;
           var item = [epf[property],proportion,property, fpf[property]];
         
           clean_data.push(item);
         }
        // console.log("clean_data",clean_data.length,clean_data,epf,cpf)
         return clean_data;
       }
}
