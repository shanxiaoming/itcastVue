<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <img src="@/assets/img/logo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {};
</script>

<style>
</style>
