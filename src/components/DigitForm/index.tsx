import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";

const DigitForm = ({ code }: { code: number }) => {
	const [values, setValues] = useState<string[]>(["", "", "", ""]);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const formRef = useRef<HTMLFormElement>(null);
	const [formValid, setFormValid] = useState(false);

	useEffect(() => {
		if (code.toString() && !Number.isNaN(code)) {
			setValues(code.toString().split(""));

		}
	}, [code]);

	useEffect(() => {
		checkFormValid();
	}, [formRef.current]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		console.log("handlesubmit");
	};

	const checkFormValid = () => {
		const form = formRef.current;
		form && !form.checkValidity() ? setFormValid(false) : setFormValid(true);
	};

	const handleChange = (e: any, index: number) => {
		const digit = e.target.value;
		const newDigits = [...values];

		if (validateDigit(Number(digit))) {
			newDigits[index] = String(digit);
			if (index < values.length - 1 && digit) {
				inputRefs.current[index + 1]?.focus();
			}
		}
		setValues(newDigits);
		checkFormValid();
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pastedData = e.clipboardData.getData("text");
		const digits = pastedData.split("").slice(0, 4);

		const newValues = [...values];
		digits.forEach((digit, index) => {
			if (inputRefs.current[index]) {
				newValues[index] = digit;
			}
		});

		setValues(newValues);
		e.preventDefault();
	};

	const handleKeyDown = (key: string, index: number) => {
		console.log("handleKeyDown");

		if (key === "ArrowRight" && index < values.length - 1) {
			inputRefs.current[index + 1]?.focus();
		} else if (key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (key === "Backspace") {
			if (!values[index] && index > 0) {
				inputRefs.current[index - 1]?.focus();
			}
		}
	};

	const validateDigit = (digit: number) => {
		return digit >= 0 && digit <= 9 ? true : false;
	};

	return (
		<>
			<Form ref={formRef} onSubmit={handleSubmit} style={style.container}>
				<FormGroup style={style.formGroup}>
					{Array.from({ length: 4 }, (_, index) => (
						<div key={index}>
							<FormControl
								id={`input${index}`}
								style={style.inputDigit}
								value={values[index]}
								ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleChange(e, index)
								}
								onPaste={handlePaste}
								onKeyDown={(e) => handleKeyDown(e.key, index)}
								required
							/>
						</div>
					))}
				</FormGroup>
				<Button
					type="submit"
					variant={formValid ? "success" : "secondary"}
					style={{ width: "75%", marginTop: "12em", borderRadius: 15 }}
				>
					Continuar
				</Button>
			</Form>
		</>
	);
};

interface IStyles {
	container: CSSProperties;
	formGroup: CSSProperties;
	inputDigit: CSSProperties;
}
const style: IStyles = {
	container: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
	},

	formGroup: {
		width: 400,
		display: "flex",
		justifyContent: "space-between",
	},

	inputDigit: {
		height: 40,
		width: 40,
		borderRadius: 15,
		outline: "none",
		color: "white",
		textAlign: "center",
		backgroundColor: "#373634",
		borderStyle: "none",
	},
};

export default DigitForm;
