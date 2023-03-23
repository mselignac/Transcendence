<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<template>
    <div className="left">
      <h1 className="bold_only">channels</h1>
      <button className="channel_button">+</button>
    </div>
    <div className="channels_names">
      <h1>_</h1>
        <RouterLink to="chat" className="friend">channel</RouterLink>
        <RouterLink to="chat" className="friend">channel 2</RouterLink>
        <RouterLink to="chat" className="friend">channel 3</RouterLink>
        <RouterLink to="chat" className="friend">channel 4</RouterLink>
        <RouterLink to="chat" className="friend">channel 5</RouterLink>
    </div>
    <div className="right">
      <RouterLink to="profile" className="user">User</RouterLink>
    </div>
    <div className="friendlist">
      <div className="friendlist_title">
        <h1 >friends list</h1>
        <button className="friendlist_button">+</button>
      </div>
      <div className="list">
        <RouterLink to="chat" className="friend">friend</RouterLink>
        <RouterLink to="chat" className="friend">friend 2</RouterLink>
        <RouterLink to="chat" className="friend">friend 3</RouterLink>
        <RouterLink to="chat" className="friend">friend 4</RouterLink>
        <RouterLink to="chat" className="friend">friend 5</RouterLink>
      </div>
    </div>
    <div className="top">
      <RouterLink to="main-page" className="top_button">Home</RouterLink>
      <RouterLink to="game-mode" className="top_button">Game Mode</RouterLink>
    </div>

</template>