import Tasks from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



export const createTask = async (req, res, next) => {
    try {
        const listing = await Tasks.create(req.body);
        if (!listing) {
            next(new ApiError(400, 'Listing not available.. Try again'))
            return;
        };

        return res.status(200).json(new ApiResponse(201, listing, 'Task Created Successfully'));

    } catch (error) {
        next(new ApiError(500, error.message));
    }
}


export const deleteUserTask = async (req, res, next) => {
    const task = await Tasks.findById(req.params.id);

    if (!task) {
        return next(new ApiError(404, 'Listing not found'))
    }
    if (req.user.id !== task.userRef) {
        return next(new ApiError(401, 'You can only delete your own task...'))
    }

    try {
        const deletedListing = await Tasks.findByIdAndDelete(req.params.id);

        return res.status(200)
        .json(new ApiResponse(200, deletedListing,'listing deleted successfully'))
        
    } catch (error) {
        next(new ApiError(500, error.message))
    }
};


export const updateUserTask = async (req, res, next) => {
    const task = await Tasks.findById(req.params.id);

    if (!task) {
        next(new ApiError(404, 'user task not found'))
    }

    if (req.user.id !== task.userRef) {
        return next(new ApiError(401, 'You can only update your own task...'))
    }

    try {
        const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.status(200).json(new ApiResponse(200, updatedTask, 'User task updated successfully'))
        
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

export const getTask = async (req, res, next) => {
    try {
        const task = await Tasks.findById(req.params.id);
    
        if (!task) {
            next(new ApiError(404, 'task not found'))
        }
    
        return res.status(200).json(new ApiResponse(200, task, 'task get successfully'))
            
        } catch (error) {
            next(new ApiError(500, "Server Error"));
        }
};