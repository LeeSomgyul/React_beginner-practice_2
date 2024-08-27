import { useRecoilState } from "recoil";
import {minuteState, hourSelector} from "./atom";

function App (){
	const [minutes, setMinutes] = useRecoilState(minuteState);//분->시로 변경하는 state
	const [hours, setHours] = useRecoilState(hourSelector);//시->분으로 변경하는 state
	const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+event.currentTarget.value);
	};
	const onHourChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHours(+event.currentTarget.value);
	};

	return(
		<div>
			<input value={minutes} onChange={onMinuteChange} type="text" placeholder="minute"/>
			<input value={hours} onChange={onHourChange} type="text" placeholder="hour"/>
		</div>
	);
}

export default App;