import { Children } from "react";

export default function Show(props) {
    let when = [];
    let otherwise = null;

    Children.forEach(props.children, (child) => {
        if (child.props.isTrue !== true) {
            otherwise = child;
        } else {
            when.push(child);
        }
    });

    return when.length > 0 ? when : otherwise;
}

Show.Then = ({ isTrue, children }) => isTrue && children;
Show.Else = ({ render, children }) => render || children;