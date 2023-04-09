import React, { useState } from 'react';

const Accordion = ({ spreadData }) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className='accordion-wrapper'>
			<div
				className={`accordion-title ${isOpen ? 'open' : ''}`}
				onClick={() => setOpen(!isOpen)}
			>
				{spreadData}
			</div>
			<div className={`accordion-item overflow-hidden h-auto ${!isOpen ? 'max-h-0' : ''}`}>
				<div className='accordion-content'>{spreadData}</div>
			</div>
		</div>
	);
};

const Learn = () => {
	const [accordion, setAccordion] = useState(false);
	return (
		<>
			<Accordion spreadData="What's It Like Inside Jupiter?" />
		</>
	);
};

export default Learn;
