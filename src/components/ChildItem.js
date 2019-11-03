import React, { useRef, useEffect } from 'react';
import { useHighlight } from '../hooks/useHighlight';

const ChildItem = props => {
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		}
	}, [props]);

	const child = props.child;
	useHighlight(
		props.updateTimeOut,
		props.idx,
		props.timeOut,
		child.ref,
		props.timeOutHandles,
		isInitialMount.current,
		[Array.isArray(child.props.children) ? child.props.children[0] : child.props.children]
	);
	return <></>;
};

export default ChildItem;
