import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => {
        return res.data
      })
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  delete() {
    return service
      .get("/api/auth/delete")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // Profile Calls
  UpdateMyProfile(userInfo) {
    return service
      .patch("/api/profile/my-profile/update", userInfo)
      .then((res)=> {console.log("in ApiHandler", res.data)
      return res.data })  
      .catch(errorHandler);
  },
  
  getMyProfile(){
    return service
      .get("/api/profile/my-profile")
      .then((res)=>res.data)
      .catch(errorHandler)
  },

  getMyCurrentBids(){
    return service
      .get("/api/profile/my-current-bids")
      .then((res)=>res.data)

      .catch(errorHandler)
  },

  getMyCurrentSales(){
    return service
      .get("/api/profile/my-current-sales")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMyCollection(){
    return service
    .get("/api/profile/my-collection")
    .then((res)=>res.data)
    .catch(errorHandler);
  },

  getMyCreations(){
    return service
    .get("/api/profile/my-creations")
    .then((res)=>res.data)
    .catch(errorHandler);
  },

   // Artworks Calls
  getSalesOn() {
    return service
      .get("/api/artworks")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneArtwork(id) {
    return service
      .get(`/api/artworks/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getOneCreator(id) {
    return service
      .get(`/api/artworks/artist/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  addAnArtwork(artworkInfo){
    return service
    .post('/api/artworks/new', artworkInfo)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  // fetch results from searchBar query
  getResults(query) {
    return service
      .get(`/api/artworks/results?search=${query}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Auctions Call
  getLastAuction(id) {
    return service
      .get(`/api/auctions/${id}/last-auction`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addABid(bidValue, id){
    return service
    .patch(`/api/auctions/${id}/new-bid`, {bidValue: bidValue} )
    .then((res)=> {
      console.log("AddaBid ", res.data)
      return res.data })
    .catch(errorHandler)
  },

  addAnAuction(auctionInfo){
    return service
    .post('/api/auctions/new', auctionInfo)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  closeAnAuction(auctionId, owner){
    console.log('new owner id dans le api handler', owner)
    return service
    .patch(`/api/auctions/close-auction/${auctionId}`, owner)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  deleteAuction(auctionId) {
    return service
    .delete(`/api/auctions/${auctionId}`)
    .then((res)=>res.data)
    .catch(errorHandler)
  },
  changePassword(passwords){
    return service.patch('/api/auth/update-password', passwords)
    .then((res)=>res.data)
    .catch(errorHandler)
  },
  updateAnArtwork(artworkId, artworkUpdated){
    return service.patch(`/api/artworks/${artworkId}`, artworkUpdated)
      
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  deleteAnArtwork(artworkId){
    return service.delete(`/api/artworks/${artworkId}`)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  UpdateCreditsAfterSell(infos){
    return service.patch(`/api/auctions/update-credits`, infos)
    .then((res)=>res.data)
    .catch(errorHandler)
  }
};


export default apiHandler;
