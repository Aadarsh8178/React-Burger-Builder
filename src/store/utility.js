const updateObject = (prevState,newState)=>{
    return {
        ...prevState,
        ...newState
    }  
}

export default updateObject;