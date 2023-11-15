import Cruise from "../models/Cruise.js"

//CREATE
export const createCruise = async (req,res,next)=>{
    const newCruise = new Cruise(req.body)

    try{
        const savedCruise = await newCruise.save()
        res.status(200).json(savedCruise) 
    }catch (err){
        next(err) 
    }
};

//UPDATE
export const updateCruise = async (req,res,next)=>{
    const newCruise = new Cruise(req.body)

    try{
        const updatedCruise = await Cruise.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedCruise) //Successfull HTTP REQUEST
    }catch (err){
        next(err) 
    }
};

//DELETE
export const deleteCruise = async (req,res,next)=>{
    try{
        await Cruise.findByIdAndDelete(req.params.id);
        res.status(200).json("Cruise has been Deleted") //Successfull HTTP REQUEST
    }catch (err){
        next(err) 
    }
};

//GET
export const getCruise = async (req,res,next)=>{
    try{
        const cruise = await Cruise.findById(req.params.id);
        res.status(200).json(cruise) //Successfull HTTP REQUEST
    }catch (err){
        next(err) 
    }
};

//GETALL
export const getCruises = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Cruises = await Cruise.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).json(Cruises);
  } catch (err) {
    next(err);
  }
};

//COUNT BY DEPARTUREPORT
export const countByDeparturePort = async (req, res, next) => {
    const ports = req.query.ports.split(",");
    try {
      const list = await Promise.all(
        ports.map((departurePort) => {
          return Cruise.countDocuments({ departurePort: departurePort });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

//COUNT BY CRUISE LINE
export const countByCruiseLine = async (req, res, next) => {
    try {
      const azamaraCount = await Cruise.countDocuments({ cruiseLine: "Azamara" });
      const carnivalCount = await Cruise.countDocuments({ cruiseLine: "Carnival" });
      const disneyCount = await Cruise.countDocuments({ cruiseLine: "Disney" });
      const mscCount = await Cruise.countDocuments({ cruiseLine: "MSC" });
      const voyagesCount = await Cruise.countDocuments({ cruiseLine: "Voyages" });
  
      res.status(200).json([
        { cruiseLine: "Azamara", count: azamaraCount },
        { cruiseLine: "Carnival", count: carnivalCount },
        { cruiseLine: "Disney", count: disneyCount },
        { cruiseLine: "MSC", count: mscCount },
        { cruiseLine: "Voyages", count: voyagesCount },
      ]);
    } catch (err) {
      next(err);
    }
  };