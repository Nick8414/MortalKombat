class Request {
  request = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (response.status !== 200) {
      throw new Error("cannot fetch the data");
    }
    const data = await response.json();
    return data;
  };

  getPlayers = async () => {
    try {
      return await this.request(
        "https://reactmarathon-api.herokuapp.com/api/mk/players"
      );
    } catch (err) {
      console.error(err);
    }
  };

  getRandomPlayer = async () => {
    try {
      return await this.request(
        "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
      );
    } catch (err) {
      console.error(err);
    }
  };

  getFight = async (fightAction) => {
		console.log(fightAction);
    try {
      return await this.request(
        "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
        {
          method: "POST",
          body: JSON.stringify(fightAction),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
};


export default Request;
