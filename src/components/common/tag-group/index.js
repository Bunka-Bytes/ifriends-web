import React, { Fragment } from 'react'
import { Tooltip, Tag, Input } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import { PlusOutlined } from '@ant-design/icons'
import './styles.css'
// ------ CONSTANTS ------
import { SIZE_LIM_TAG } from '../../../utils/constants'

export default class EditableTagGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  }

  handleClose = (removedTag) => {
    const tags = this.props.tags.filter(
      (tag) => tag.toLowerCase() !== removedTag.toLowerCase()
    )
    this.props.alteraCampoTipo(tags, 'tags')
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value?.toString().toUpperCase() })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.props
    if (
      inputValue &&
      tags.findIndex(
        (tag) => tag.toLowerCase() === inputValue.toLowerCase()
      ) === -1
    ) {
      tags = [...tags, inputValue]
    }

    this.setState({
      inputVisible: false,
      inputValue: '',
    })
    this.props.alteraCampoTipo(tags, 'tags')
  }

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value })
  }

  handleEditInputConfirm = () => {
    // const { inputValue } = this.state;
    // let { tags } = this.props;
    // if (inputValue && tags.findIndex(tag => tag.toLowerCase() === inputValue.toLowerCase()) === -1) {
    //   tags = [...tags, inputValue];
    // }

    // this.setState({
    //   inputVisible: false,
    //   inputValue: '',
    //   editInputIndex: -1,
    // });

    this.setState(({ editInputIndex, editInputValue }) => {
      const newTags = [...this.props.tags]
      newTags[editInputIndex] = editInputValue

      this.props.alteraCampoTipo(newTags, 'tags')
      return {
        editInputIndex: -1,
        editInputValue: '',
      }
    })
  }

  saveInputRef = (input) => {
    this.input = input
  }

  saveEditInputRef = (input) => {
    this.editInput = input
  }

  render() {
    const { inputVisible, inputValue, editInputIndex, editInputValue } =
      this.state
    const { tags } = this.props
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            )
          }

          const isLongTag = tag.length > SIZE_LIM_TAG

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  this.setState(
                    { editInputIndex: index, editInputValue: tag },
                    () => {
                      this.editInput.focus()
                    }
                  )
                  e.preventDefault()
                }}
              >
                {isLongTag ? `${tag.slice(0, SIZE_LIM_TAG)}...` : tag}
              </span>
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            maxLength={50}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    )
  }
}

// export default class EditableTagGroup extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   state = {
//     inputVisible: false,
//     inputValue: '',
//   };

//   componentDidUpdate(prevProps) {
//     // Uso típico, (não esqueça de comparar as props):
//     // if (this.props.userID !== prevProps.userID) {
//     //   this.fetchData(this.props.userID);
//     // }
//   }

//   handleClose = removedTag => {
//     console.log(this.props.tags, removedTag)
//     const tags = this.props.tags.filter(tag => tag.toLowerCase() !== removedTag.toLowerCase());
//     this.props.alteraCampoTipo(tags, "tags");
//   };

//   showInput = () => {
//     this.setState({ inputVisible: true }, () => this.input.focus());
//   };

//   handleInputChange = e => {
//     this.setState({ inputValue: e.target.value });
//   };

//   handleInputConfirm = () => {
//     const { inputValue } = this.state;
//     let { tags } = this.props;
//     if (inputValue && tags.findIndex(tag => tag.toLowerCase() === inputValue.toLowerCase()) === -1) {
//       tags = [...tags, inputValue];
//     }

//     this.setState({
//       inputVisible: false,
//       inputValue: '',
//     });
//     this.props.alteraCampoTipo(tags, "tags")
//   };

//   saveInputRef = input => {
//     this.input = input;
//   };

//   forMap = tag => {
//     // const tagElem = (
//     //   <Tag
//     //     closable
//     //     onClose={e => {
//     //       e.preventDefault();
//     //       this.handleClose(tag);
//     //     }}
//     //   >
//     //     {tag}
//     //   </Tag>
//     // );
//     // return (
//     //   <span key={tag} style={{ display: 'inline-block' }}>
//     //     {tagElem}
//     //   </span>
//     // );

//     return (
//       <Tag
//         closable
//         onClose={e => {
//           e.preventDefault();
//           this.handleClose(tag);
//         }}
//         className={'edit-tag'}
//       >
//         {tag}
//       </Tag>
//     )
//   };

//   render() {
//     const { inputVisible, inputValue } = this.state;
//     const { tags } = this.props
//     const tagChild = tags.map(this.forMap);

//     return (
//       <Fragment>
//         {/* <TweenOneGroup
//           enter={{
//             scale: 0.8,
//             opacity: 0,
//             type: 'from',
//             duration: 100,
//           }}
//           onEnd={e => {
//             if (e.type === 'appear' || e.type === 'enter') {
//               e.target.style = 'display: inline-block';
//             }
//           }}
//           leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
//           appear={false}
//         > */}
//         {tagChild}
//         {/* </TweenOneGroup> */}
//         {inputVisible && (
//           <Input
//             ref={this.saveInputRef}
//             type="text"
//             size="small"
//             style={{ width: 78 }}
//             value={inputValue}
//             onChange={this.handleInputChange}
//             onBlur={this.handleInputConfirm}
//             onPressEnter={this.handleInputConfirm}
//             className="tag-input"
//           />
//         )}
//         {!inputVisible && (
//           <Tag onClick={this.showInput} className="site-tag-plus">
//             <PlusOutlined /> New Tag
//           </Tag>
//         )}
//       </Fragment>
//     );
//   }
// }
