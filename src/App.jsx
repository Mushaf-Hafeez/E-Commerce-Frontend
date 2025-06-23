import { useSelector, useDispatch } from "react-redux";
import { Button } from "./components/ui/button";

import { increment, decrement } from "./redux/slices/counterSlice";

const App = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <h1>{count}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
    </div>
  );
};

export default App;
