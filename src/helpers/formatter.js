 const formatterUserData=(data)=>{
   
        return {
            id:data.id,
            name:data.name,
            email:data.email,
            profileImageUrl:data.profileImageUrl,
            roles:data.roles,
            createAt:data.createdAt
            
        }


}

export default formatterUserData;