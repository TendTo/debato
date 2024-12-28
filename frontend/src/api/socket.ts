import { io, Socket } from "socket.io-client";
import {
  AllButLast,
  ClientToServerEvents,
  ServerToClientEvents,
} from "@debato/api";

export default class WebSocket {
  private static _instance: WebSocket;
  private readonly hostname = "localhost";
  private readonly port = 8000;
  private readonly url = `http://${this.hostname}:${this.port}`;
  private readonly socketTimeout = 5000;
  private callbacks: Partial<ServerToClientEvents> = {};

  private _socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  private constructor() {
    this._socket = io(this.url, {
      ackTimeout: this.socketTimeout,
      autoConnect: false,
    });
  }

  public static get instance(): WebSocket {
    if (!WebSocket._instance) {
      WebSocket._instance = new WebSocket();
    }
    return WebSocket._instance;
  }

  public get socket(): Socket<ServerToClientEvents, ClientToServerEvents> {
    return this._socket;
  }

  private connect(): void {
    this._socket.connect();
    for (const event in this.callbacks) {
      console.log("Registering", event, this.callbacks[event]);
      this._socket.on(event as any, this.callbacks[event]);
    }
  }

  private disconnect(): void {
    for (const event in this.callbacks) {
      this._socket.offAny(event as any);
    }
    this._socket.disconnect();
  }

  public on<T extends keyof ServerToClientEvents>(
    event: T,
    callback: ServerToClientEvents[T]
  ): void {
    this.callbacks[event] = callback;
    if (this._socket.connected) {
      this._socket.offAny(event as any);
      this._socket.on(event as any, callback);
    }
  }

  public off<T extends keyof ServerToClientEvents>(event: T): void {
    delete this.callbacks[event];
    if (this._socket.connected) {
      this._socket.offAny(event as any);
    }
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...args: Parameters<ClientToServerEvents[T]>
  ): void {
    if (!this._socket.connected) this.connect();
    this._socket.emit(event, ...args);
  }

  public emitWithAck<T extends keyof ClientToServerEvents>(
    event: T,
    ...args: AllButLast<Parameters<ClientToServerEvents[T]>>
  ) {
    if (!this._socket.connected) this.connect();
    return this._socket.emitWithAck(event, ...args);
  }
}
