import type {FC} from 'react';
import type {LinkProps as NextLinkProps} from 'next/link';
import NextLink from 'next/link';

type ExternalLinkProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

type InternalLinkProps = Omit<NextLinkProps, 'href' | 'passHref'> & {href: string; children: React.ReactNode};

// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
type LinkProps = (InternalLinkProps | ExternalLinkProps) & {className?: string};

const Link: FC<LinkProps> = ({className, ...props}) => {
    if (props.href?.includes('http')) {
        const {children, href, ...externalProps} = props as ExternalLinkProps;

        return (
            // eslint-disable-next-line react/jsx-no-target-blank
            <a className={className} href={href} rel="noreferrer" target="_blank" {...externalProps}>
                {children}
            </a>
        );
    }

    const {children, href, ...internalProps} = props as InternalLinkProps;

    return (
        <NextLink href={href} passHref {...internalProps}>
            <a className={className}>{children}</a>
        </NextLink>
    );
};

export type {LinkProps};
export {Link};
