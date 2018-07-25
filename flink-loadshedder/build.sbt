resolvers in ThisBuild ++= Seq(
  "Apache Development Snapshot Repository" at "https://repository.apache.org/content/repositories/snapshots/",
  //"Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/",
  Resolver.mavenLocal
)

name := "flink-loadshedder"
organization := "berlin.bbdc.inet"
version := "0.1.0"

scalaVersion := "2.11.12"
val Specs2Version = "4.0.2"
val AkkaVersion = "2.4.20"
val flinkVersion = "1.4.2"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % AkkaVersion,
  "org.apache.flink" %% "flink-scala" % flinkVersion % "provided",
  "org.apache.flink" %% "flink-streaming-scala" % flinkVersion % "provided",
  "org.specs2" %% "specs2-core" % Specs2Version % "test",
  "org.specs2" %% "specs2-mock" % Specs2Version % "test",
  "berlin.bbdc.inet" % "mera-commons_2.11" % "0.1.0"
)
