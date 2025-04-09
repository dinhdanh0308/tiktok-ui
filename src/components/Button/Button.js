import classNames from 'classnames/bind';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline,
    ref,
    large = false,
    small = false,
    link,
    text,
    disable,
    rounded,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    onSubmit,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onSubmit,
        onClick,
        ...passProps,
    };
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        disable,
        text,
        rounded,
        [className]: className,
    });
    return (
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropType.string,
    href: PropType.string,
    primary: PropType.bool,
    outline: PropType.bool,
    large: PropType.bool,
    small: PropType.bool,
    link: PropType.string,
    text: PropType.bool,
    disable: PropType.bool,
    rounded: PropType.bool,
    children: PropType.node.isRequired,
    className: PropType.string,
    leftIcon: PropType.node,
    rightIcon: PropType.node,
    onClick: PropType.func,
};

export default Button;
