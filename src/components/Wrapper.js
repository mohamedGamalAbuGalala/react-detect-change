import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import ChildItem from './ChildItem';

let timeOutHandles = [];
let validChildren = {};

const updateTimeOut = (idx, value) => {
	timeOutHandles[idx] = value;
};

const Wrapper = props => {
	const [validChildrenPaths, setValidChildrenPaths] = useState([]);
	const isInitialMount = useRef(true);

	//
	//
	//
	// get tree dfs
	const getValidChildren = useCallback((cur, path) => {
		const children = cur.props.children;
		if (typeof children === 'object' && children.length)
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (typeof child === 'object') getValidChildren(child, `${path}children[${i}]`);
				else if (child.toString().trim().length) {
					// eslint-disable-next-line no-loop-func
					setValidChildrenPaths(_c => {
						validChildren[cur.key] = cur;
						if (_c && _c.includes(`${path}children[${i}]`)) {
							return _c;
						} else if (_c) {
							return [..._c, `${path}children[${i}]`];
						}

						return [`${path}children[${i}]`];
					});
					// console.log(cur, child);
				}
			}
		else if (children.toString().trim().length) {
			setValidChildrenPaths(_c => {
				validChildren[cur.key] = cur;
				if (_c && _c.includes(`${path}children`)) {
					return _c;
				} else if (_c) {
					return [..._c, `${path}children`];
				}

				return [`${path}children`];
			});
			// console.log('***', cur, children);
		}
	}, []);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			console.log(props.children);
		}

		setValidChildrenPaths(_c => {
			getValidChildren({ props: { children: props.children } }, '');
			return _c.filter(c => c);
		});
		timeOutHandles = Array(validChildrenPaths.length).fill();
	}, [getValidChildren, props.children, validChildrenPaths.length]);

	useEffect(() => {
		console.log(validChildren);
	}, [props.children]);
	return (
		<>
			{Object.keys(validChildren).map((key, idx) => {
				const child = validChildren[key];
				return (
					<ChildItem
						key={idx}
						{...props}
						idx={idx}
						updateTimeOut={updateTimeOut}
						timeOutHandles={timeOutHandles[idx]}
						child={child}
					></ChildItem>
				);
			})}

			{props.children}
		</>
	);
};

export default Wrapper;
