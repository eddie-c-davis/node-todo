/* eslint-disable consistent-return */
const express = require('express');
const schema = require('../db/schema');
const db = require('../db/connection');

const tasks = db.get('tasks');
const router = express.Router();

/* Get all tasks */
router.get('/', async (req, res, next) => {
    try {
        const allTasks = await tasks.find({});
        res.json(allTasks);
    } catch (error) {
        next(error);
    }
});

/* Get a specific task by ID */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await tasks.findOne({ _id: id });

        if (!task) {
            const error = new Error('task does not exist');
            return next(error);
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
});

/* Create a new task */
router.post('/', async (req, res, next) => {
    try {
        const { name, job } = req.body;
        const result = await schema.validateAsync({ name, job });
        const task = await tasks.findOne({ name })

        // task already exists
        if (task) {
            res.status(409); // conflict error
            return next(new Error('Task already exists'));
        }

        const new_task = await tasks.insert({
            name,
            job,
        });

        console.log('New task has been created');
        res.status(201).json(new_task);
    } catch (error) {
        next(error);
    }
});

/* Update a specific task by ID */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, job } = req.body;
        const result = await schema.validateAsync({ name, job });
        const task = await tasks.findOne({ _id: id });

        // task does not exist
        if (!task) {
            return next();
        }

        const updatedtask = await tasks.update({
            _id: id,
        }, {
            $set: result
        },
            { upsert: true }
        );

        res.json(updatedtask);
    } catch (error) {
        next(error);
    }
});

/* Delete a specific task by ID */
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await tasks.findOne({_id: id});

        // task does not exist
        if (!task) {
            return next();
        }
        await tasks.remove({_id: id});

        res.json({message: 'Success'});

    } catch (error) {
        next(error);
    }
});

module.exports = router;
