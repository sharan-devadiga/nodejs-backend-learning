let  RESPONSE={
    SUCCESS:{
        code:200,
        message:"Everything is worked as expected"
    },
    REQUIRED:{
        code:400,
        message:"is Required"
    },
UNKNOWN:{
        code:500,
        message:"Something went wrong"
    },
EXISTS:{
        code:204,
        message:"is Already Exists"
    },
INVALID:{
        code:300,
        message:"is Invalid"
    },
NOT_FOUND:{
        code:350,
        message:"Not Found"
    },
}
export default RESPONSE