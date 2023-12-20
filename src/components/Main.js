import React, { useState, useEffect } from "react";
import "../css/main.css";

const Main = (props) => {
  const {
    onTaskAdd,
    propTasks,
    updatePropTasks,
    setTasksCounter,
    tasksCounter,
  } = props;

  const [tasks, setTasks] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [tasksDoneVisible, setTasksDoneVisible] = useState(false);
  const [tasksContainerVisible, setTasksContainerVisible] = useState(false);

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    updatePropTasks(newTasks);
    setTasksCounter((prevCounter) => prevCounter - 1);
    updateTaskCounters();
    showTasks();
  };

  const deleteDoneTask = (index) => {
    const newTasksDone = tasksDone.filter((_, i) => i !== index);
    setTasksDone(newTasksDone);
    updateDoneCounter();
    hideTasks();
  };

  useEffect(() => {
    setTasks(propTasks);
  }, [propTasks]);

  useEffect(() => {
    setTasks(propTasks);
  }, [propTasks]);

  const updateTaskCounters = () => {
    updateTaskCounterBig();
    updateDoneCounter();
  };

  const handleColorChangeClick = () => {
    const colorChangeCapsule = document.querySelector(".capsule.color-change");
    if (colorChangeCapsule) {
      colorChangeCapsule.style.backgroundColor = "lightblue";
    }
  };

  const showTasks = () => {
    setTasksContainerVisible(!tasksContainerVisible);
  };

  const hideTasks = () => {
    setTasksContainerVisible(false);
  };

  const updateTaskCounterBig = () => {
    const taskCounterBigElement = document.getElementById("taskCounterBig");
    if (taskCounterBigElement) {
      taskCounterBigElement.textContent = tasks.length;
    }
  };

  const toggleTasksDoneVisibility = () => {
    setTasksDoneVisible(!tasksDoneVisible);
  };

  const updateDoneCounter = () => {
    const tasksDoneCounter = document.getElementById("tasksDoneCounter");
    if (tasksDoneCounter) {
      tasksDoneCounter.textContent = tasksDone.length;
    }
  };

  const markTaskAsDone = (index) => {
    const task = propTasks[index];
    setTasksDone((prevTasksDone) => [...prevTasksDone, task]);
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    updateTaskCounters();
    updatePropTasks((prevPropTasks) => {
      const newPropTasks = [...prevPropTasks];
      newPropTasks.splice(index, 1);
      return newPropTasks;
    });
    setTasksCounter((prevCounter) => prevCounter - 1);
  };

  const markTaskAsUndone = (index) => {
    const task = tasksDone[index];
    setTasksDone((prevTasksDone) =>
      prevTasksDone.filter((_, i) => i !== index)
    );
    setTasks((prevTasks) => [...prevTasks, task]);
    updateTaskCounters();
    setTasksCounter(tasksCounter + 1);
    showTasks();
  };

  const updateTasksAndCounters = (newTasks) => {
    updatePropTasks(newTasks);
    setTasks(newTasks);
    updateTaskCounters();
    showTasks();
  };

  const updateCounterDaily = () => {
    updateDaysBeforeMonthCounter();
    setTimeout(updateCounterDaily, 86400000);
  };

  const updateDaysBeforeMonthCounter = () => {
    const daysBeforeMonthCounter = document.getElementById("daysBeforeMonth");
    const daysLeft = daysUntilEndOfMonth();
    if (daysBeforeMonthCounter) {
      daysBeforeMonthCounter.textContent = daysLeft;
    }
  };

  const daysUntilEndOfMonth = () => {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysLeft = Math.ceil(
      (lastDayOfMonth - currentDate) / (1000 * 60 * 60 * 24)
    );
    return daysLeft;
  };

  const generateStyledCalendar = () => {
    const calendarContainer = document.querySelector(".calendar-container");
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = offset; i > 0; i--) {
      const previousMonthDay = document.createElement("div");
      previousMonthDay.classList.add("calendar-day", "previous-month");
      previousMonthDay.textContent = daysInMonth - i + 1;
      calendarContainer.appendChild(previousMonthDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const calendarDay = document.createElement("div");
      calendarDay.classList.add("calendar-day");

      if (day === currentDay) {
        calendarDay.classList.add("today");
      }

      const dayOfWeek = (offset + day - 1) % 7;
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        calendarDay.classList.add("weekend");
      }

      calendarDay.textContent = day;
      calendarContainer.appendChild(calendarDay);
    }

    const calendarH1 = document.querySelector(".container.calendarh h1");
    if (calendarH1) {
      calendarH1.classList.add("current-month");
    }
  };

  useEffect(() => {
    generateStyledCalendar();
  }, []);

  useEffect(() => {
    updateTaskCounters();
    updateCounterDaily();
  }, [updatePropTasks, tasksCounter]);

  return (
    <>
      <div className="bigcapsule" onClick={showTasks}>
        <h1 id="taskCounterBig">{tasks.length}</h1>
        <p>tasks in progress</p>
        {tasksContainerVisible && (
          <div className="tasks-container">
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <p>{task}</p>
                <button onClick={() => markTaskAsDone(index)}>Done</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="capsules-row">
        <div
          className="capsule"
          id="tasksDoneCapsule"
          onClick={toggleTasksDoneVisibility}
        >
          <h1 id="tasksDoneCounter">{tasksDone.length}</h1>
          <p>tasks done</p>
          <div className="tasks-done-container">
            {tasksDoneVisible &&
              tasksDone.map((task, index) => (
                <div key={index} className="task-item">
                  <p>{task}</p>
                  <button onClick={() => markTaskAsUndone(index)}>
                    Undone
                  </button>
                  <button onClick={() => deleteDoneTask(index)}>Delete</button>
                </div>
              ))}
          </div>
        </div>
        <div className="capsule color-change" onClick={handleColorChangeClick}>
          <h1 id="daysBeforeMonth">0</h1>
          <p>days before new month</p>
        </div>
      </div>

      <div className="container calendarh">
        <h1>Calendar</h1>
        <div className="calendar-capsule">
          <div className="calendar-container" id="calendarContainer"></div>
        </div>
      </div>
    </>
  );
};

export default Main;
