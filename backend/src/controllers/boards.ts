import express from 'express';
import { User, getUserBySessionToken } from '../models/user.model.js';
import boards from 'src/routes/boards.js';
import { forEach } from 'lodash';

export const createBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { board, column, inputID: columnID } = req.body;
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);
  console.log(`WRNEWIOFNEWRF ${JSON.stringify(req.body)}`);
  if (!board.name) {
    throw new Error('You must include a title for your board to be created.');
  }

  existingUser.boards.forEach((existingBoard: any) => {
    if (
      existingBoard.title.toLowerCase().trim() ===
      board.name.toLowerCase().trim()
    ) {
      throw new Error(
        '{"boardError": "Cannot have multiple boards with the same name"}'
      );
    }
  });

  let columns: Array<any> = [];
  //if we created columns, check if column names are duplicated
  if (column) {
    if (new Set(column).size !== column.length) {
      throw new Error(
        '{"columnError": "Cannot have multiple columns with the same name"}'
      );
    }

    column.forEach((title: string, index: number) =>
      columns.push({ title: title, clientID: columnID[index], tasks: [] })
    );
  }
  console.log(columns);
  const result = { title: board.name.trim(), columns: columns };
  console.log(result);
  existingUser.boards.push(result);
  await existingUser.save();
  res.status(200).send(existingUser);
};

export const editBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { board, column, boardID, inputID: columnID } = req.body;
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);
  console.log(JSON.stringify(req.body));
  if (!board.name) {
    throw new Error(
      '{"boardError": "You must include a title for your board to be edited."}'
    );
  }

  existingUser.boards.forEach((existingBoard: any) => {
    if (
      existingBoard.title.toLowerCase().trim() ===
        board.name.toLowerCase().trim() &&
      !existingBoard._id.equals(boardID)
    ) {
      throw new Error(
        '{"boardError": "Cannot have multiple boards with the same name"}'
      );
    }
  });

  //if we created columns, check if column names are duplicated
  if (column) {
    if (
      column.filter(
        (
          (s: any) => (v: string) =>
            s.has(v.toUpperCase().trim()) || !s.add(v.toUpperCase().trim())
        )(new Set())
      ).length > 0
    ) {
      throw new Error(
        '{"columnError": "Cannot have multiple columns with the same name"}'
      );
    }
  }

  existingUser.boards.forEach((existingBoard: any) => {
    console.log(existingBoard._id.equals(boardID));
    if (existingBoard._id.equals(boardID)) {
      // console.log(existingBoard.title);
      // handle potential change in name
      if (existingBoard.title.trim() !== board.name.trim()) {
        existingBoard.title = board.name.trim();
        console.log(`new title: ${existingBoard.title}`);
      }
      // if the board had existing columns
      if (existingBoard.columns.length > 0) {
        existingBoard.columns.forEach((col: any, index: number) => {
          console.log(col.clientID, columnID[index]);
          // if columns are renamed
          if (col.clientID === columnID[index]) {
            col.title = column[index];
          }
          // if columns are removed
          if (!columnID.includes(col.clientID)) {
            existingBoard.columns.splice(index, 1);
          }
          // if it is a new columns
          columnID.forEach((input: any, index: number) => {
            const check = existingBoard.columns.find(
              (item: any, index: number) => input === item.clientID
            );
            console.log(`this is the check: ${check}`);
            if (!check) {
              existingBoard.columns.push({
                title: column[index],
                clientID: columnID[index],
                tasks: [],
              });
            }
          });
        });
      } else {
        if (column) {
          column.forEach((col: any, index: number) => {
            existingBoard.columns.push({
              title: col,
              clientID: columnID[index],
              tasks: [],
            });
          });
        }
      }
    }
    console.log(existingBoard);
  });

  // this overwrites the tasks and subtasks when we add a column

  await existingUser.save();
  res.status(200).send(existingUser);
};

export const deleteBoard = async (
  req: express.Request,
  res: express.Response
) => {
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);
  const { id } = req.params;

  existingUser.boards.forEach((board: any, index: number) => {
    if (board._id.equals(id)) {
      existingUser.boards.splice(index, 1);
    }
  });
  console.log(existingUser.boards);
  await existingUser.save();
  res.status(200).send(existingUser);
};

export const createTask = async (
  req: express.Request,
  res: express.Response
) => {
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);
  const { boardID, task, status, subtask, inputID: clientID } = req.body;
  console.log(req.body);
  let subtasks: Array<any> = [];

  if (subtask) {
    subtask.forEach((sTask: string, index: number) =>
      subtasks.push({
        title: sTask,
        complete: false,
        clientID: clientID[index],
      })
    );
  }

  existingUser.boards.forEach((board: any) => {
    if (board._id.equals(boardID)) {
      board.columns.forEach((column: any) => {
        if (column.title === status) {
          task.subtasks = subtasks;
          column.tasks.push(task);
        }
      });
    }
  });
  await existingUser.save();
  res.status(200).send(existingUser);
};

export const saveTaskModal = async (
  req: express.Request,
  res: express.Response
) => {
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);
  const { boardID, columnID, taskID, subtask, status } = req.body;

  let taskBeingMoved: any;
  // change subtasks values between checked and unchecked
  existingUser.boards.forEach((board: any) => {
    if (board._id.equals(boardID)) {
      board.columns.forEach((col: any) => {
        col.tasks.forEach((task: any) => {
          if (task._id.equals(taskID)) {
            if (subtask) {
              task.subtasks.forEach((item: any) => {
                if (
                  subtask.includes(
                    JSON.stringify(item._id).replace(/['"]+/g, '')
                  )
                ) {
                  item.complete = true;
                } else {
                  item.complete = false;
                }
              });
            }
            if (!col._id.equals(status)) {
              taskBeingMoved = task;
            }
          }
        });
      });
    }
  });

  // move columns for task
  if (columnID !== status) {
    existingUser.boards.forEach((board: any) => {
      if (board._id.equals(boardID)) {
        board.columns.forEach((col: any) => {
          if (col._id.equals(columnID)) {
            // console.log(columnID);
            col.tasks.forEach((task: any, index: Number) => {
              if (task.equals(taskBeingMoved)) {
                col.tasks.splice(index, 1);
              }
            });
          }
          if (col._id.equals(status)) {
            col.tasks = [...col.tasks, taskBeingMoved];
          }
        });
      }
    });
  }
  await existingUser.save();
  res.status(200).send(existingUser);
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);

  const { boardID, columnID, taskID } = req.body;

  existingUser.boards.forEach((board: any) => {
    if (board._id.equals(boardID)) {
      board.columns.forEach((col: any) => {
        if (col._id.equals(columnID)) {
          col.tasks.forEach((task: any, index: Number) => {
            if (task._id.equals(taskID)) {
              col.tasks.splice(index, 1);
            }
          });
        }
      });
    }
  });

  await existingUser.save();
  res.status(200).send(existingUser);
};

export const editTask = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);

  const {
    taskID,
    columnID,
    boardID,
    subtask,
    inputID,
    task: updatedTask,
    status,
  } = req.body;

  let taskBeingMoved: any;
  existingUser.boards.forEach((board: any) => {
    if (board._id.equals(boardID)) {
      board.columns.forEach((col: any, index: number) => {
        if (col._id.equals(columnID)) {
          col.tasks.forEach((task: any) => {
            if (task._id.equals(taskID)) {
              // edit task if task already exists but has a different name
              if (task.title !== updatedTask.title.trim()) {
                task.title = updatedTask.title.trim();
              }

              // edit username if task already exists but has a different name
              if (task.description !== updatedTask.description.trim()) {
                task.description = updatedTask.description.trim();
              }

              // edit subtasks
              if (subtask) {
                task.subtasks.forEach((item: any, index: number) => {
                  console.log(item);
                  const check = inputID.find(
                    (input: any, index: number) => input === item.clientID
                  );
                  console.log('YUH');
                  // if the subtask already exists in our list, update the name
                  if (subtask[inputID.indexOf(check)]) {
                    item.title = subtask[inputID.indexOf(check)];
                  } else {
                    console.log(task.subtasks.splice(index, 1));
                  }

                  console.log('title: ', item.title);
                  console.log('new title: ', subtask[inputID.indexOf(check)]);
                });

                inputID.forEach((input: any, index: number) => {
                  const check = task.subtasks.find(
                    (item: any, index: number) => input === item.clientID
                  );

                  // if the input id is not a value in any of the items in the task.subtasks list, add a new subtask to the list
                  if (!check) {
                    const newSubtask = {
                      title: subtask[index],
                      clientID: input,
                      completed: false,
                    };
                    task.subtasks = [...task.subtasks, newSubtask];
                  }
                });
              }

              if (!col._id.equals(status)) {
                taskBeingMoved = task;
              }
            }
          });
        }
      });
    }
  });

  // when we change column
  if (columnID !== status) {
    console.log(columnID, status);
    existingUser.boards.forEach((board: any) => {
      if (board._id.equals(boardID)) {
        board.columns.forEach((col: any) => {
          if (col._id.equals(columnID)) {
            console.log(columnID);
            col.tasks.forEach((task: any, index: Number) => {
              if (task.equals(taskBeingMoved)) {
                console.log();
                col.tasks.splice(index, 1);
              }
            });
          }
          if (col._id.equals(status)) {
            col.tasks = [...col.tasks, taskBeingMoved];
          }
        });
      }
    });
  }

  await existingUser.save();
  res.status(200).send(existingUser);
};

export const moveTask = async (req: express.Request, res: express.Response) => {
  // console.log(req.body);

  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);
  const { taskID, oldColumnID, newColumnID, boardID } = req.body;
  let movedTask: any;
  existingUser.boards.forEach((board: any) => {
    if (board._id.equals(boardID)) {
      board.columns.forEach((col: any) => {
        if (col._id.equals(oldColumnID)) {
          col.tasks.forEach((task: any, index: number) => {
            if (task._id.equals(taskID)) {
              movedTask = task;
              col.tasks.splice(index, 1);
              console.log(col.title, col.tasks);
            }
          });
        }
      });
      board.columns.forEach((col: any) => {
        if (col._id.equals(newColumnID)) {
          col.tasks = [...col.tasks, movedTask];
          console.log(col.title, col.tasks);
        }
      });
    }
  });
  await existingUser.save();
  res.status(200).send(existingUser);
};
