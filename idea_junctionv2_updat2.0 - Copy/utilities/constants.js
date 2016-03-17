module.exports = {
    user_status : { 
                    active:{id: 1, description: "Active"},
                    blocked:{id: 2, description: "Blocked"},
                    deactived:{id: 3, description: "Deactived"}
                  },
    
    getUserStatusDescById: function(id) {
        console.log("Id passed is " + id);
        for (var key in this.user_status) {
          if (this.user_status.hasOwnProperty(key) && this.user_status[key].id == id) {
             console.log("desc = " + this.user_status[key].description);
             return this.user_status[key].description;
          }
        }
        return null;
    },
    
    getUserStatusIdByDesc: function(desc) {
        console.log("Desc passed is " + desc);
        for (var key in this.user_status) {
          if (this.user_status.hasOwnProperty(key) && this.user_status[key].desc == desc) {
             console.log("id = " + this.user_status[key].id);
             return this.user_status[key].id;
          }
        }
        return null;
        
    }
}
    