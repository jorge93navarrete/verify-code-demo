import React, { CSSProperties, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

const DigitInput = (props:any) => {
	const [digit, setDigit] = useState<number | undefined>(undefined);

	useEffect(() => {
		validateDigit(Number(props.value));
	}, []);

	const validateDigit = (digit: number) => {
		if (digit >= 0 && digit <= 9) {
			setDigit(digit);
		}
	};

	return (
		<>
			<FormControl
				type="number"
				min="0"
				max="9"
				style={style}
				value={digit}
				//onChange={(e) => validateDigit(Number(e.target.value))}
			/>
		</>
	);
};

const style: CSSProperties = {
	height: 40,
	width: 40,
	borderRadius: 15,
	outline: "none",
	color: "white",
	textAlign: "center",
	backgroundColor: "#373634",
	borderStyle: "none",
};

export default DigitInput;
