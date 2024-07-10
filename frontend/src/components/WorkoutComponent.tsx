import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Exercise {
  name: string;
  set: number;
  rep: number;
  completed: number; // 0 for incomplete, 1 for completed
}

const WorkoutComponent: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: 'SIDE LATERAL RAISES', set: 3, rep: 12, completed: 0 },
    { name: 'Bench press', set: 3, rep: 20, completed: 0 },
    { name: 'FRONT LATERAL RAISES', set: 3, rep: 12, completed: 0 },
    { name: 'FRONT LATERAL RAISES (Squizz)', set: 3, rep: 12, completed: 0 },
    { name: 'SIT UP', set: 3, rep: 13, completed: 0 },
    { name: 'REAR DELT FLY', set: 3, rep: 7, completed: 0 },
  ]);

  const [completedWorkouts, setCompletedWorkouts] = useState<{ date: Date, exercises: Exercise[] }[]>([]);

  const handleCheckboxChange = (index: number) => {
    const newExercises = [...exercises];
    newExercises[index].completed = newExercises[index].completed === 0 ? 1 : 0;
    setExercises(newExercises);
  };

  useEffect(() => {
    console.log(exercises);
  })

  const handleFinishDay = async () => {
    try {
      // Save completed exercises for the day
      const completedExercisesToday = exercises.filter(exercise => exercise.completed === 1);

      // Send data to backend with server timestamp
      const response = await axios.post('/api/workout/finish', {
        exercises: completedExercisesToday,
      });
      
      // Update completed workouts history with server timestamp
      setCompletedWorkouts(prev => [...prev, { date: new Date(response.data.date), exercises: completedExercisesToday }]);

      // Reset exercises for the next day
      const resetExercises = exercises.map(exercise => ({
        ...exercise,
        completed: 0,
      }));
      setExercises(resetExercises);

      console.log('Workout for today finished:', completedExercisesToday);
    } catch (error) {
      console.error('Error finishing workout:', error);
    }
  };

  return (
    <div>
      <h2>Workout Exercises</h2>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={exercise.completed === 1}
              onChange={() => handleCheckboxChange(index)}
            />{' '}
            {exercise.name} - Sets: {exercise.set}, Reps: {exercise.rep}
          </label>
        </div>
      ))}
      <button onClick={handleFinishDay}>Finish Day</button>

      {/* Display completed workouts history */}
      <div>
        <h3>Completed Workouts History</h3>
        <ul>
          {completedWorkouts.map((workout, index) => (
            <li key={index}>
              <p>Date: {workout.date.toLocaleDateString()}</p>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index}>
                    {exercise.name} - Sets: {exercise.set}, Reps: {exercise.rep}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutComponent;
