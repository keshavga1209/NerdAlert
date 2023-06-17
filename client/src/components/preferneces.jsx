import { useState } from "react"
export function Preferences(){

    const [inputFields, setInputFields] = useState([{
        topic:'',
    } ]);
 
    const addInputField = ()=>{

        setInputFields([...inputFields, {
            topic:'',
        } ])
      
    }

    const removeInputFields = (index)=>{
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
   }

   const handleChange = (index, evnt)=>{
    const { name, value } = evnt.target;
    const list = [...inputFields];
    console.log(list)
    list[index][name] = value;
    setInputFields(list);
}
    return(
    
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                  {
                      inputFields.map((data, index)=>{
                          const {topic}= data;
                          return(
                            <div className="row my-3" key={index}>
                    <div className="col">
                    <div className="form-group">
                    <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={topic} name="topic" className="form-control"  placeholder="Topic Name" />
                    </div>
                    </div>
                    <div>
                

                
                 {(inputFields.length!==1)? <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={removeInputFields}>Remove</button>:''}
                  
                 
                    </div>
                  </div>
                          )
                      })
                  }
     
                <div className="row">
                    <div className="col-sm-12">

                    <button className="btn btn-outline-success " onClick={addInputField}>Add Topic</button>
                    </div>
                </div>
                  </div>
                </div>
                <div className="col-sm-4">

                </div>
            </div>
        
    )
}
// export default Preferences