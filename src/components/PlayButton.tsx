import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

export function PlayButton(
    {
      handlerRunVisualizer,
      isDisabled,
      isGraphVisualized,
    }:{
        isDisabled:boolean;
        isGraphVisualized:boolean;
        handlerRunVisualizer:MouseEventHandler<HTMLButtonElement>; //MouseEventHandler<HTMLButtonElement> is a type alias in TypeScript that defines a function to handle mouse events specifically for HTML button elements.

    }
){
    return (
        <button disabled={isDisabled} onClick={handlerRunVisualizer} className="disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30">
            {isGraphVisualized ? (<GrPowerReset className="w-5 h-5"/>) : (<BsFillPlayFill className="w-5 h-5"/>)}
        </button>
    )
}