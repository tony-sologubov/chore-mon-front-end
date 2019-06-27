import firebase from '../../firebase'

const logic = {
  delete: (user, groupId, comment, taskId) => {
    const commentsRef = firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks`)
      .doc(taskId)
    commentsRef.update({
      comments: firebase.arr.arrayRemove(comment)
    })
  },

  fetch: (user, groupId, setComments) => {
    const unsubscribe = firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks/`)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc =>
          setComments(Object.values(doc.data().comments))
        )
      )
    return () => {
      unsubscribe()
    }
  },

  add: (e, user, groupId, taskId, comment) => {
    e.preventDefault()
    const commentsRef = firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks`)
      .doc(taskId)
    commentsRef.update({
      comments: firebase.arr.arrayUnion(comment)
    })
  }
}

export default logic
