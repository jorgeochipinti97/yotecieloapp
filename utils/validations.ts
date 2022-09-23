
export const isValidEmail = (email: any): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
      return !!match;
  };
  
  export const isEmail = (email: any): string | undefined => {
    return isValidEmail(email) 
      ? undefined
      : 'wrong email';
  }
  
  