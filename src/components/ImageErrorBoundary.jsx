import React from "react";

class ImageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          <span className="text-gray-400">Image unavailable</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ImageErrorBoundary;
