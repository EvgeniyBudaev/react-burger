import React, { Component, ErrorInfo, ReactNode } from "react";

interface IErrorBoundaryProps {
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);

        this.renderErrorPage = this.renderErrorPage.bind(this);
        this.state = { hasError: false };
    }

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError(error: Error): IErrorBoundaryState {
        console.error(error);
        return { hasError: true };
    }

    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.log("Возникла ошибка!", error, info);
    }

    renderErrorPage(): ReactNode {
        return (
            <div className="ErrorBoundary">
                <div className="ErrorBoundary-Header" />
                <div className="ErrorBoundary-Content">
                    <div className="ErrorBoundary-Message">
                        <div className="ErrorBoundary-MessageTitle">
                            Произошла ошибка
                        </div>
                        <div className="ErrorBoundary-MessageText">
                            Произошла неизвестная ошибка, попробуйте{" "}
                            <a href="/">обновить страницу</a>.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.renderErrorPage();
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
